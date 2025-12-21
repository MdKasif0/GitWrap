



import { PlaceHolderImages } from './placeholder-images';

export type GitHubData = {
  name: string;
  username: string;
  avatarUrl: string;
  contributionCount: number;
  commitCount: number;
  mostUsedLanguage: string;
  contributionData: Array<{ date: string; count: number }>;
  longestStreak: number;
  currentStreak: number;
  mostProductiveDay: string;
  bestMonth: string;
  topLanguages: { language: string, percentage: number, bytes: number }[];
  mostCommittedRepo: string;
  totalStars: number;
  mergedPRs: number;
  issuesOpened: number;
  reposCreated: number;
  repoNames: string[];
  commitMessages: string[];
  followers: number;
  forks: number;
};

const GITHUB_API_URL = 'https://api.github.com';
const headers = {
  Authorization: `token ${process.env.GITHUB_TOKEN}`,
  Accept: 'application/vnd.github.v3+json',
};

async function fetchFromGitHub(endpoint: string, options?: RequestInit) {
  const response = await fetch(`${GITHUB_API_URL}${endpoint}`, {
    headers,
    ...options,
  });
  if (!response.ok) {
    const errorBody = await response.json().catch(() => ({ message: response.statusText }));
     if (response.status === 404) {
      throw new Error(`Not Found: Could not find user data for ${endpoint}`);
    }
    throw new Error(`GitHub API error on ${endpoint}: ${errorBody.message}`);
  }
  return response.json();
}

async function fetchFromGitHubGraphQL(query: string, variables: Record<string, any>) {
  const response = await fetch('https://api.github.com/graphql', {
    method: 'POST',
    headers: {
      Authorization: `bearer ${process.env.GITHUB_TOKEN}`,
    },
    body: JSON.stringify({ query, variables }),
  });
  if (!response.ok) {
    const errorBody = await response.json().catch(() => ({ message: response.statusText }));
    throw new Error(`GitHub GraphQL API error: ${errorBody.message}`);
  }
  return response.json();
}

const getCurrentStreak = (contributionDates: Set<string>): number => {
    let currentStreak = 0;
    const today = new Date();
    // Check if there was a contribution today. If not, start checking from yesterday.
    const startDate = contributionDates.has(today.toISOString().split('T')[0]) ? today : new Date(today.setDate(today.getDate() -1));

    for (let i = 0; i < 365; i++) {
        const d = new Date(startDate);
        d.setDate(startDate.getDate() - i);
        const dateString = d.toISOString().split('T')[0];

        if (contributionDates.has(dateString)) {
            currentStreak++;
        } else {
            break;
        }
    }
    return currentStreak;
};


const getLongestStreak = (contributionDates: Set<string>): number => {
    let longestStreak = 0;
    let currentStreak = 0;
    
    const startDate = new Date('2025-01-01');
    for (let i = 0; i < 365; i++) {
        const currentDate = new Date(startDate);
        currentDate.setDate(startDate.getDate() + i);
        const dateString = currentDate.toISOString().split('T')[0];

        if (contributionDates.has(dateString)) {
            currentStreak++;
        } else {
            longestStreak = Math.max(longestStreak, currentStreak);
            currentStreak = 0;
        }
    }
    longestStreak = Math.max(longestStreak, currentStreak);
    return longestStreak;
};

const getMostProductiveDay = (data: Array<{ date: string; count: number }>): string => {
    const dayCounts = [0, 0, 0, 0, 0, 0, 0];
    data.forEach(item => {
        const day = new Date(item.date).getUTCDay();
        dayCounts[day] += item.count;
    });
    const maxDay = dayCounts.indexOf(Math.max(...dayCounts));
    const days = ['Sunday', 'Monday', 'Tuesday', 'Wednesday', 'Thursday', 'Friday', 'Saturday'];
    return days[maxDay];
};

const getBestMonth = (data: Array<{ date: string; count: number }>): string => {
    const monthCounts: { [key: string]: number } = {};
    const months = ['January', 'February', 'March', 'April', 'May', 'June', 'July', 'August', 'September', 'October', 'November', 'December'];
    
    data.forEach(item => {
        const month = new Date(item.date).getUTCMonth();
        const monthName = months[month];
        monthCounts[monthName] = (monthCounts[monthName] || 0) + item.count;
    });

    let bestMonth = '';
    let maxCount = 0;
    for (const month in monthCounts) {
        if (monthCounts[month] > maxCount) {
            maxCount = monthCounts[month];
            bestMonth = month;
        }
    }
    return bestMonth;
};


export async function fetchGitHubData(username: string): Promise<GitHubData> {
  if (!process.env.GITHUB_TOKEN) {
    throw new Error("GitHub token is not configured. Please add it to your .env file.");
  }
  
  const fromDate = "2025-01-01T00:00:00Z";
  const toDate = "2025-12-31T23:59:59Z";

  const contributionsQuery = `
    query($username: String!, $from: DateTime!, $to: DateTime!) {
      user(login: $username) {
        name
        avatarUrl
        followers {
          totalCount
        }
        contributionsCollection(from: $from, to: $to) {
          contributionCalendar {
            totalContributions
            weeks {
              contributionDays {
                date
                contributionCount
              }
            }
          }
          totalCommitContributions
          totalPullRequestContributions
          totalIssueContributions
          popularPullRequestContribution {
            pullRequest {
              title
            }
          }
          commitContributionsByRepository(maxRepositories: 100) {
            repository {
              name
              stargazers {
                totalCount
              }
              forkCount
              languages(first: 10, orderBy: {field: SIZE, direction: DESC}) {
                edges {
                  size
                  node {
                    name
                  }
                }
              }
            }
            contributions {
              totalCount
            }
          }
        }
        repositories(first: 100, ownerAffiliations: OWNER, orderBy: {field: CREATED_AT, direction: DESC}) {
          nodes {
            name
            createdAt
          }
        }
      }
    }
  `;

  const { data: { user } } = await fetchFromGitHubGraphQL(contributionsQuery, {
    username,
    from: fromDate,
    to: toDate,
  });

  if (!user) {
    throw new Error(`Not Found: Could not find user data for ${username}`);
  }

  const contribCollection = user.contributionsCollection;
  const contributionCalendar = contribCollection.contributionCalendar;

  const contributionData = contributionCalendar.weeks.flatMap((week: any) => week.contributionDays.map((day: any) => ({
    date: day.date,
    count: day.contributionCount
  })));
  
  const contributionDates = new Set(contributionData.filter(d => d.count > 0).map(d => d.date));


  const languages: { [lang: string]: number } = {};
  let mostCommittedRepo = '';
  let maxCommits = 0;
  let totalStars = 0;
  let forks = 0;

  contribCollection.commitContributionsByRepository.forEach((repoContrib: any) => {
    const repo = repoContrib.repository;
    totalStars += repo.stargazers.totalCount;
    forks += repo.forkCount;
    
    repo.languages.edges.forEach((langEdge: any) => {
      languages[langEdge.node.name] = (languages[langEdge.node.name] || 0) + langEdge.size;
    });

    if (repoContrib.contributions.totalCount > maxCommits) {
        maxCommits = repoContrib.contributions.totalCount;
        mostCommittedRepo = repo.name;
    }
  });

  const totalLangBytes = Object.values(languages).reduce((sum, bytes) => sum + bytes, 0);
  const topLanguages = Object.entries(languages)
    .sort(([, a], [, b]) => b - a)
    .slice(0, 5)
    .map(([language, bytes]) => ({
      language,
      bytes,
      percentage: totalLangBytes > 0 ? Math.round((bytes / totalLangBytes) * 100) : 0
    }));

  const mostUsedLanguage = topLanguages.length > 0 ? topLanguages[0].language : 'N/A';
  
  const reposCreated2025 = user.repositories.nodes.filter((repo: any) => new Date(repo.createdAt).getFullYear() === 2025);

  const fetchOptions = { next: { revalidate: 600 } };
  let allEvents: any[] = [];
  let page = 1;
  while (page < 3) { // Limit to first 2 pages (200 events) for performance
    const events = await fetchFromGitHub(`/users/${username}/events?per_page=100&page=${page}`, fetchOptions);
    if (!Array.isArray(events) || events.length === 0) break;
    const events2025 = events.filter((e: any) => new Date(e.created_at).getFullYear() === 2025);
    allEvents.push(...events2025);
    page++;
  }
  
  const pushEvents = allEvents.filter(e => e.type === 'PushEvent');
  const commitMessages = pushEvents
    .flatMap((e: any) => e.payload.commits?.map((c: any) => c.message) || [])
    .slice(0, 10);
    
  const repoNames = user.repositories.nodes.map((r: any) => r.name);


  return {
    name: user.name || username,
    username,
    avatarUrl: user.avatarUrl,
    contributionCount: contributionCalendar.totalContributions,
    commitCount: contribCollection.totalCommitContributions,
    mostUsedLanguage,
    contributionData,
    longestStreak: getLongestStreak(contributionDates),
    currentStreak: getCurrentStreak(contributionDates),
    mostProductiveDay: getMostProductiveDay(contributionData),
    bestMonth: getBestMonth(contributionData),
    topLanguages,
    mostCommittedRepo,
    totalStars,
    mergedPRs: contribCollection.totalPullRequestContributions,
    issuesOpened: contribCollection.totalIssueContributions,
    reposCreated: reposCreated2025.length,
    repoNames,
    commitMessages,
    followers: user.followers.totalCount,
    forks,
  };
}
