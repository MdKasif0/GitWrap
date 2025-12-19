
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
};

const MOCK_USER = {
  name: 'Alex Doe',
  avatarId: 'user-avatar',
};

// Helper function to calculate the longest streak
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

// Helper function to get the most productive day
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
  // We'll keep the mock data for now, but expand it with the new fields
  await new Promise(resolve => setTimeout(resolve, 2000));

  if (username.toLowerCase() === 'error') {
    throw new Error('This user loves breaking things. Failed to fetch data.');
  }

  const seed = username.toLowerCase().split('').reduce((acc, char) => acc + char.charCodeAt(0), 0);
  
  const contributionCount = 1000 + (seed % 1500);
  const commitCount = 2000 + (seed % 2000);
  const languages = ['TypeScript', 'Python', 'Go', 'Rust', 'JavaScript', 'Java', 'C#', 'PHP'];
  const mostUsedLanguage = languages[seed % languages.length];

  const contributionData = Array.from({ length: 365 }, (_, i) => {
    const d = new Date(2025, 0, 1);
    d.setDate(d.getDate() + i);
    const dayOfWeek = d.getDay();
    const isWeekend = dayOfWeek === 0 || dayOfWeek === 6;

    const baseActivity = (Math.sin((i / 365) * Math.PI * 2 + seed) + 1.5) * 3;
    const randomNoise = Math.random() * 4;
    const weekendMultiplier = isWeekend ? 0.5 : 1.2;
    
    let count = Math.round(baseActivity * weekendMultiplier + randomNoise);
    count = count < 0 ? 0 : count;
    
    return {
      date: d.toISOString().split('T')[0],
      count: count,
    };
  });
  
  const longestStreak = getLongestStreak(contributionData);
  const mostProductiveDay = getMostProductiveDay(contributionData);
  
  const topLanguages = [
    { language: mostUsedLanguage, percentage: 30 + (seed % 20) },
    { language: languages[(seed + 1) % languages.length], percentage: 15 + (seed % 10) },
    { language: languages[(seed + 2) % languages.length], percentage: 10 + (seed % 5) },
    { language: languages[(seed + 3) % languages.length], percentage: 5 + (seed % 5) },
    { language: languages[(seed + 4) % languages.length], percentage: 5 + (seed % 5) },
  ];

  const avatar = PlaceHolderImages.find(img => img.id === MOCK_USER.avatarId);

  return {
    name: username.split(/[-_.]/).map(word => word.charAt(0).toUpperCase() + word.slice(1)).join(' '),
    username,
    avatarUrl: avatar?.imageUrl.replace('/seed/gitwrap/', `/seed/${username}/`) || `https://picsum.photos/seed/${username}/400/400`,
    contributionCount,
    commitCount,
    mostUsedLanguage,
    contributionData,
    longestStreak: longestStreak,
    mostProductiveDay: mostProductiveDay,
    topLanguages: topLanguages,
    mostCommittedRepo: `${username}/project-${seed % 10}`,
    totalStars: 50 + (seed % 150),
    mergedPRs: 100 + (seed % 200),
    issuesOpened: 20 + (seed % 30),
    reposCreated: 5 + (seed % 10),
  };
}
