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
  contributionCount: z
    .number()
    .describe('Total number of contributions made by the user.'),
  mostUsedLanguage: z
    .string()
    .describe('The most used programming language by the user.'),
  totalCommits: z.number().describe('The total number of commits made by the user.'),
  commitMessages: z.array(z.string()).describe('An array of recent commit messages.'),
  repos: z.array(z.string()).describe('An array of repository names.'),
});
export type GenerateGitHubRoastInput = z.infer<
  typeof GenerateGitHubRoastInputSchema
>;

const GenerateGitHubRoastOutputSchema = z.object({
  roast: z
    .string()
    .describe(
      'A humorous roast of the user based on their GitHub activity data.'
    ),
});
export type GenerateGitHubRoastOutput = z.infer<
  typeof GenerateGitHubRoastOutputSchema
>;

export async function generateGitHubRoast(
  input: GenerateGitHubRoastInput
): Promise<GenerateGitHubRoastOutput> {
  return generateGitHubRoastFlow(input);
}

const roastPrompt = ai.definePrompt({
  name: 'githubRoastPrompt',
  input: {schema: GenerateGitHubRoastInputSchema},
  output: {schema: GenerateGitHubRoastOutputSchema},
  prompt: `You are a brutally honest, self-deprecating tech roast master. Based on this GitHub user's 2025 activity, generate a 2-3 line roast that is funny, savage, and technical.

User Data:
- Total commits: {{{totalCommits}}}
- Top languages: {{{mostUsedLanguage}}}
- Most common commit messages: {{{commitMessages}}}
- Repository names: {{{repos}}}

Generate a roast that:
1. Is 2-3 lines maximum
2. Uses programming humor and technical references
3. Is brutally honest but playful
4. References specific patterns from their data
5. Has a self-deprecating tone

Example style:
"343 commits but 340 were 'fixed typo' - peak engineering right there! Your Python code has more import errors than a customs office, but hey, at least you're consistent with that 3am commit schedule."`,
  config: {
    temperature: 0.9,
    maxOutputTokens: 200,
  }
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
