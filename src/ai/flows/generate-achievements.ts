'use server';

/**
 * @fileOverview Flow to generate personalized achievements based on GitHub activity.
 *
 * - generateAchievements - A function that generates achievements based on GitHub activity.
 * - GenerateAchievementsInput - The input type for the generateAchievements function.
 * - GenerateAchievementsOutput - The return type for the generateAchievements function.
 */

import {ai} from '@/ai/genkit';
import {z} from 'genkit';

const GenerateAchievementsInputSchema = z.object({
  username: z.string().describe('The GitHub username of the user.'),
  contributionCount: z
    .number()
    .describe('The number of contributions the user has made.'),
  mostUsedLanguage: z
    .string()
    .describe('The most used programming language by the user.'),
  commitCount: z.number().describe('The number of commits the user has made.'),
});
export type GenerateAchievementsInput = z.infer<
  typeof GenerateAchievementsInputSchema
>;

const GenerateAchievementsOutputSchema = z.object({
  achievements: z
    .array(z.string())
    .describe('An array of personalized achievements for the user.'),
});
export type GenerateAchievementsOutput = z.infer<
  typeof GenerateAchievementsOutputSchema
>;

export async function generateAchievements(
  input: GenerateAchievementsInput
): Promise<GenerateAchievementsOutput> {
  return generateAchievementsFlow(input);
}

const generateAchievementsPrompt = ai.definePrompt({
  name: 'generateAchievementsPrompt',
  input: {schema: GenerateAchievementsInputSchema},
  output: {schema: GenerateAchievementsOutputSchema},
  prompt: `You are an AI assistant that generates personalized achievements for GitHub users based on their activity.

  Given the following GitHub activity data, generate a list of achievements that would motivate the user to further improve their contributions.

  GitHub Username: {{username}}
  Contribution Count: {{contributionCount}}
  Most Used Language: {{mostUsedLanguage}}
  Commit Count: {{commitCount}}

  Achievements should be encouraging and tailored to the user's specific activity.  For example, mention the user's main language or contribution count.

  Example Achievements:
  - "Code Alchemist: Mastered the art of crafting code in {{mostUsedLanguage}}!"
  - "Commitment Champion: Reached a new milestone with {{commitCount}} commits!"
  - "Contribution King/Queen: Your {{contributionCount}} contributions are making a difference!"

  Ensure that the generated achievements are creative, specific, and relevant to the user's provided data.
  Return a JSON array of strings.
  `,
});

const generateAchievementsFlow = ai.defineFlow(
  {
    name: 'generateAchievementsFlow',
    inputSchema: GenerateAchievementsInputSchema,
    outputSchema: GenerateAchievementsOutputSchema,
  },
  async input => {
    const {output} = await generateAchievementsPrompt(input);
    return output!;
  }
);
