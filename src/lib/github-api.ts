
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
  mostProductiveDay: string;
  topLanguages: { language: string, percentage: number }[];
  mostCommittedRepo: string;
  totalStars: number;
  mergedPRs: number;
  issuesOpened: number;
  reposCreated: number;
  repoNames: string[];
  commitMessages: string[];
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

const getLongestStreak = (data: Array<{ date: string; count: number }>): number => {
    let longestStreak = 0;
    let currentStreak = 0;
    for (const item of data) {
        if (item.count > 0) {
            currentStreak++;
        } else {
            if (currentStreak > longestStreak) {
                longestStreak = currentStreak;
            }
            currentStreak = 0;
        }
    }
    if (currentStreak > longestStreak) {
        longestStreak = currentStreak;
    }
    return longestStreak;
};

const getMostProductiveDay = (data: Array<{ date: string; count: number }>): string => {
    const dayCounts = [0, 0, 0, 0, 0, 0, 0];
    data.forEach(item => {
        const day = new Date(item.date).getDay();
        dayCounts[day] += item.count;
    });
    const maxDay = dayCounts.indexOf(Math.max(...dayCounts));
    const days = ['Sunday', 'Monday', 'Tuesday', 'Wednesday', 'Thursday', 'Friday', 'Saturday'];
    return days[maxDay];
};


export async function fetchGitHubData(username: string): Promise<GitHubData> {
  if (!process.env.GITHUB_TOKEN) {
    throw new Error("GitHub token is not configured. Please add it to your .env file.");
  }
  
  const fetchOptions = { next: { revalidate: 600 } }; // Cache for 10 minutes
  
  const user = await fetchFromGitHub(`/users/${username}`, fetchOptions);

  // Fetch all user events for 2025
  let allEvents: any[] = [];
  let page = 1;
  while (true) {
    const events = await fetchFromGitHub(`/users/${username}/events?per_page=100&page=${page}`, fetchOptions);
    if (!Array.isArray(events)) {
      console.warn("GitHub events API did not return an array. Stopping pagination.", events);
      break;
    }
    const events2025 = events.filter((e: any) => new Date(e.created_at).getFullYear() === 2025);
    allEvents.push(...events2025);
    if (events.length < 100 || !events.some((e: any) => new Date(e.created_at).getFullYear() === 2025)) {
      break;
    }
    page++;
  }
  
  const contributionData: { [key: string]: { date: string, count: number } } = {};
  for (let i = 0; i < 365; i++) {
    const d = new Date(2025, 0, 1);
    d.setDate(d.getDate() + i);
    const dateString = d.toISOString().split('T')[0];
    contributionData[dateString] = { date: dateString, count: 0 };
  }
  
  allEvents.forEach(event => {
    const date = new Date(event.created_at).toISOString().split('T')[0];
    if (contributionData[date]) {
      contributionData[date].count++;
    }
  });

  const contributionArray = Object.values(contributionData);
  const contributionCount = allEvents.length;
  
  const pushEvents = allEvents.filter(e => e.type === 'PushEvent');
  const commitCount = pushEvents.reduce((acc: number, e: any) => acc + (e.payload.commits?.length || 0), 0);
  const commitMessages = pushEvents
    .flatMap((e: any) => e.payload.commits?.map((c: any) => c.message) || [])
    .slice(0, 10); // Get latest 10 commit messages

  const repos = await fetchFromGitHub(`/users/${username}/repos?per_page=100&sort=updated`, fetchOptions);
  const repoNames = repos.map((r: any) => r.name);
  const repos2025 = repos.filter((r: any) => new Date(r.created_at).getFullYear() === 2025);

  let totalStars = 0;
  let languages: { [lang: string]: number } = {};
  let mostCommittedRepo = '';
  let maxCommits = 0;

  for (const repo of repos) {
    totalStars += repo.stargazers_count;
    const repoLangs = await fetchFromGitHub(`/repos/${username}/${repo.name}/languages`, fetchOptions);
    for (const lang in repoLangs) {
      languages[lang] = (languages[lang] || 0) + repoLangs[lang];
    }
    
    const repoCommits = pushEvents
      .filter((e:any) => e.repo.name === `${username}/${repo.name}`)
      .reduce((acc: number, e: any) => acc + (e.payload.commits?.length || 0), 0);
    
    if (repoCommits > maxCommits) {
        maxCommits = repoCommits;
        mostCommittedRepo = repo.name;
    }
  }

  const totalLangBytes = Object.values(languages).reduce((sum, bytes) => sum + bytes, 0);
  const topLanguages = Object.entries(languages)
    .sort(([, a], [, b]) => b - a)
    .slice(0, 5)
    .map(([language, bytes]) => ({
      language,
      percentage: totalLangBytes > 0 ? Math.round((bytes / totalLangBytes) * 100) : 0
    }));

  const mostUsedLanguage = topLanguages.length > 0 ? topLanguages[0].language : 'N/A';
  
  const pullRequestEvents = allEvents.filter(e => e.type === 'PullRequestEvent' && e.payload.action === 'closed' && e.payload.pull_request.merged);
  const mergedPRs = pullRequestEvents.length;

  const issuesOpenedEvents = allEvents.filter(e => e.type === 'IssuesEvent' && e.payload.action === 'opened');
  const issuesOpened = issuesOpenedEvents.length;
  
  const longestStreak = getLongestStreak(contributionArray);
  const mostProductiveDay = getMostProductiveDay(contributionArray);

  return {
    name: user.name || username,
    username,
    avatarUrl: user.avatar_url,
    contributionCount,
    commitCount,
    mostUsedLanguage,
    contributionData: contributionArray,
    longestStreak,
    mostProductiveDay,
    topLanguages,
    mostCommittedRepo,
    totalStars,
    mergedPRs,
    issuesOpened,
    reposCreated: repos2025.length,
    repoNames,
    commitMessages
  };
}
