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
  prompt: `You are a witty and friendly tech humorist. Based on this GitHub user's 2025 activity, generate a 2-3 line light-hearted and funny roast. It should be playful and use programming humor.

User Data:
- Total commits: {{{totalCommits}}}
- Top languages: {{{mostUsedLanguage}}}
- Most common commit messages: {{{commitMessages}}}
- Repository names: {{{repos}}}

Generate a roast that:
1. Is 2-3 lines maximum
2. Uses programming humor and technical references
3. Is playful and funny
4. References specific patterns from their data

Example style:
"With {{{totalCommits}}} commits, you're practically paying rent on GitHub. Your main language is {{{mostUsedLanguage}}}? Nice, I hear that's the second-best language for writing 'hello world'."`,
  config: {
    temperature: 0.8,
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
    if (!output) {
      return { roast: "Looks like my AI roast generator is on a coffee break. Consider yourself spared... for now." };
    }
    return output;
  }
);
