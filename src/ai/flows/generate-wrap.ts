'use server';

/**
 * @fileOverview Generates a humorous roast and personalized achievements from a user's GitHub activity data.
 *
 * - generateWrap - A function that generates the roast and achievements.
 * - GenerateWrapInput - The input type for the generateWrap function.
 * - GenerateWrapOutput - The return type for the generateWrap function.
 */

import {ai} from '@/ai/genkit';
import {z} from 'genkit';

const GenerateWrapInputSchema = z.object({
  username: z.string().describe('The GitHub username of the user.'),
  contributionCount: z
    .number()
    .describe('Total number of contributions made by the user.'),
  commitCount: z.number().describe('The total number of commits made by the user.'),
  mostUsedLanguage: z
    .string()
    .describe('The most used programming language by the user.'),
  commitMessages: z
    .array(z.string())
    .describe('An array of recent commit messages.'),
  repos: z.array(z.string()).describe('An array of repository names.'),
});
export type GenerateWrapInput = z.infer<typeof GenerateWrapInputSchema>;

const AchievementSchema = z.object({
  icon: z.enum(['Trophy', 'Flame', 'BrainCircuit', 'GitPullRequest', 'Rocket', 'Code']),
  title: z.string(),
  description: z.string(),
  rarity: z.enum(['Legendary', 'Epic', 'Rare', 'Common']),
  color: z.enum(['yellow', 'purple', 'blue', 'gray']),
});

const GenerateWrapOutputSchema = z.object({
  roast: z
    .string()
    .describe(
      'A humorous, 2-3 line roast of the user based on their GitHub activity data.'
    ),
  achievements: z
    .array(AchievementSchema)
    .describe(
      'An array of 4 personalized achievement objects for the user.'
    ),
});
export type GenerateWrapOutput = z.infer<typeof GenerateWrapOutputSchema>;

export async function generateWrap(
  input: GenerateWrapInput
): Promise<GenerateWrapOutput> {
  return generateWrapFlow(input);
}

const generateWrapPrompt = ai.definePrompt({
  name: 'generateWrapPrompt',
  input: {schema: GenerateWrapInputSchema},
  output: {schema: GenerateWrapOutputSchema},
  prompt: `You are a witty tech humorist and an encouraging mentor. Based on this GitHub user's 2025 activity, generate a JSON object containing:
1.  A "roast": a 2-3 line light-hearted and funny roast. It should be playful and use programming humor.
2.  An "achievements" array: exactly 4 personalized achievements with an icon, title, description, rarity, and color.

User Data:
- Username: {{{username}}}
- Contribution Count: {{{contributionCount}}}
- Commit Count: {{{commitCount}}}
- Top Language: {{{mostUsedLanguage}}}
- Recent Commit Messages: {{{commitMessages}}}
- Repository Names: {{{repos}}}

ROAST GUIDELINES:
- Be 2-3 lines maximum.
- Use programming humor and technical references.
- Be playful and funny, not mean.
- Reference specific patterns from their data if possible.
- Example Style: "With {{{commitCount}}} commits, you're practically paying rent on GitHub. Your main language is {{{mostUsedLanguage}}}? Nice, I hear that's the second-best language for writing 'hello world'."

ACHIEVEMENT GUIDELINES:
- Generate exactly 4 unique achievements.
- Achievements should be encouraging and tailored to the user's specific activity. For example, mention the user's main language or contribution count.
- The 'icon' field must be one of the following strings: 'Trophy', 'Flame', 'BrainCircuit', 'GitPullRequest', 'Rocket', 'Code'.
- The 'rarity' field must be one of the following strings: 'Legendary', 'Epic', 'Rare', 'Common'.
- The 'color' field must be one of the following strings: 'yellow', 'purple', 'blue', 'gray'.
- Example Achievement Object:
  {
    "icon": "Trophy",
    "title": "Code Alchemist",
    "description": "Mastered the art of crafting code in {{{mostUsedLanguage}}}!",
    "rarity": "Rare",
    "color": "yellow"
  }
`,
  config: {
    temperature: 0.7,
  },
});

const generateWrapFlow = ai.defineFlow(
  {
    name: 'generateWrapFlow',
    inputSchema: GenerateWrapInputSchema,
    outputSchema: GenerateWrapOutputSchema,
  },
  async input => {
    const {output} = await generateWrapPrompt(input);
    if (!output) {
      // Fallback in case the AI fails
      return {
        roast:
          "Looks like my AI roast generator is on a coffee break. Consider yourself spared... for now.",
        achievements: [
          {
            icon: 'Trophy',
            title: 'Mystery Coder',
            description: "Your work is so advanced, our AI couldn't even process it!",
            rarity: 'Legendary',
            color: 'purple',
          },
           {
            icon: 'Code',
            title: 'The Ghost in the Machine',
            description: "Made commits so clean, they're invisible to AI.",
            rarity: 'Epic',
            color: 'blue',
          },
           {
            icon: 'Rocket',
            title: 'Launch Sequencer',
            description: 'Prepared for liftoff with some solid code.',
            rarity: 'Rare',
            color: 'yellow',
          },
           {
            icon: 'GitPullRequest',
            title: 'Contributor',
            description: 'Opened a pull request to the annals of history.',
            rarity: 'Common',
            color: 'gray',
          },
        ],
      };
    }
    // Ensure we always return exactly 4 achievements
    if (output.achievements.length > 4) {
      output.achievements = output.achievements.slice(0, 4);
    }
    while (output.achievements.length < 4) {
      output.achievements.push({
         icon: 'GitPullRequest',
         title: 'Code Cadet',
         description: 'Keeps the coding world spinning.',
         rarity: 'Common',
         color: 'gray',
      });
    }

    return output;
  }
);
