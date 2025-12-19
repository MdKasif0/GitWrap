import { PlaceHolderImages } from './placeholder-images';

export type GitHubData = {
  name: string;
  username: string;
  avatarUrl: string;
  contributionCount: number;
  commitCount: number;
  mostUsedLanguage: string;
  contributionData: Array<{ date: string; count: number }>;
};

const MOCK_USER = {
  name: 'Alex Doe',
  avatarId: 'user-avatar',
};

export async function fetchGitHubData(username: string): Promise<GitHubData> {
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

  const avatar = PlaceHolderImages.find(img => img.id === MOCK_USER.avatarId);

  return {
    name: username.split(/[-_.]/).map(word => word.charAt(0).toUpperCase() + word.slice(1)).join(' '),
    username,
    avatarUrl: avatar?.imageUrl.replace('/seed/gitwrap/', `/seed/${username}/`) || `https://picsum.photos/seed/${username}/400/400`,
    contributionCount,
    commitCount,
    mostUsedLanguage,
    contributionData,
  };
}
