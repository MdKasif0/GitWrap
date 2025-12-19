'use server';

/**
 * @fileOverview Generates a humorous roast of a user's GitHub activity data.
 *
 * - generateGitHubRoast - A function that generates the roast.
 * - GenerateGitHubRoastInput - The input type for the generateGitHubRoast function.
 * - GenerateGitHubRoastOutput - The return type for the generateGitHubRoast function.
 */

import {ai} from '@/ai/genkit';
import {z} from 'genkit';

const GenerateGitHubRoastInputSchema = z.object({
  username: z.string().describe('The GitHub username of the user.'),
  contributionCount: z.number().describe('Total number of contributions made by the user.'),
  mostUsedLanguage: z.string().describe('The most used programming language by the user.'),
  totalCommits: z.number().describe('The total number of commits made by the user.'),
});
export type GenerateGitHubRoastInput = z.infer<typeof GenerateGitHubRoastInputSchema>;

const GenerateGitHubRoastOutputSchema = z.object({
  roast: z.string().describe('A humorous roast of the user based on their GitHub activity data.'),
});
export type GenerateGitHubRoastOutput = z.infer<typeof GenerateGitHubRoastOutputSchema>;

export async function generateGitHubRoast(input: GenerateGitHubRoastInput): Promise<GenerateGitHubRoastOutput> {
  return generateGitHubRoastFlow(input);
}

const roastPrompt = ai.definePrompt({
  name: 'githubRoastPrompt',
  input: {schema: GenerateGitHubRoastInputSchema},
  output: {schema: GenerateGitHubRoastOutputSchema},
  prompt: `Generate a humorous roast for a GitHub user based on the following data:\n\nUsername: {{{username}}}\nTotal Contributions: {{{contributionCount}}}\nMost Used Language: {{{mostUsedLanguage}}}\nTotal Commits: {{{totalCommits}}}\n\nThe roast should be funny and personalized, highlighting both achievements and potential shortcomings in a lighthearted way. Focus on poking fun at their coding habits and contributions. The roast should be no more than 4 sentences long.`,
});

const generateGitHubRoastFlow = ai.defineFlow(
  {
    name: 'generateGitHubRoastFlow',
    inputSchema: GenerateGitHubRoastInputSchema,
    outputSchema: GenerateGitHubRoastOutputSchema,
  },
  async input => {
    const {output} = await roastPrompt(input);
    return output!;
  }
);
