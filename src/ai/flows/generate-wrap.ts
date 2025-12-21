'use server';

/**
 * @fileOverview Generates a humorous roast and personalized achievements from a user's GitHub activity data using the Groq API.
 *
 * - generateWrap - A function that generates the roast and achievements.
 * - GenerateWrapInput - The input type for the generateWrap function.
 * - GenerateWrapOutput - The return type for the generateWrap function.
 */

import {z} from 'zod';
import Groq from 'groq-sdk';
import {config} from 'dotenv';

config();

const groq = new Groq({
  apiKey: process.env.GROQ_API_KEY,
});

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
      'A brutally honest, savage, and funny 2-3 line roast of the user based on their GitHub activity.'
    ),
  achievements: z
    .array(AchievementSchema)
    .describe(
      'An array of 4 personalized achievement objects for the user.'
    ),
});
export type GenerateWrapOutput = z.infer<typeof GenerateWrapOutputSchema>;

function buildPrompt(input: GenerateWrapInput): string {
  return `You are a brutally honest and sarcastic code critic. Your job is to analyze a GitHub user's 2025 activity and generate a JSON object containing:
1.  A "roast": An unfiltered, brutally honest, and savage 2-3 line roast. It should be funny because it's true.
2.  An "achievements" array: exactly 4 personalized (but still slightly backhanded) achievements with an icon, title, description, rarity, and color.

User Data:
- Username: ${input.username}
- Contribution Count: ${input.contributionCount}
- Commit Count: ${input.commitCount}
- Top Language: ${input.mostUsedLanguage}
- Recent Commit Messages: ${JSON.stringify(input.commitMessages)}
- Repository Names: ${JSON.stringify(input.repos)}

Your response MUST be a valid JSON object that conforms to this Zod schema:
${JSON.stringify(GenerateWrapOutputSchema.shape, null, 2)}

ROAST GUIDELINES:
- Be 2-3 lines maximum.
- Be unfiltered, brutally honest, and savage. Don't hold back.
- Use programming humor and technical references to highlight their flaws.
- Point out questionable patterns from their data (e.g., low commit count, generic commit messages, using an old language).
- Example Style: "${input.contributionCount} contributions? I've seen more activity in a commented-out block of code. And your top language is ${input.mostUsedLanguage}? Are you preserving a digital fossil?"

ACHIEVEMENT GUIDELINES:
- Generate exactly 4 unique achievements.
- They should sound like achievements but have a sarcastic or backhanded compliment.
- The 'icon' field must be one of the following strings: 'Trophy', 'Flame', 'BrainCircuit', 'GitPullRequest', 'Rocket', 'Code'.
- The 'rarity' field must be one of the following strings: 'Legendary', 'Epic', 'Rare', 'Common'.
- The 'color' field must be one of the following strings: 'yellow', 'purple', 'blue', 'gray'.
- Example Backhanded Achievement:
  {
    "icon": "Flame",
    "title": "Keyboard Enthusiast",
    "description": "You typed a lot of characters this year. Some of them even compiled.",
    "rarity": "Common",
    "color": "gray"
  }

Return ONLY the JSON object, with no other text before or after it.
`;
}

async function fallbackResponse(): Promise<GenerateWrapOutput> {
    return {
        roast:
          "My AI is too scared to roast you. You must be a 10x developer... or you have an empty GitHub profile. One of the two.",
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

export async function generateWrap(
  input: GenerateWrapInput
): Promise<GenerateWrapOutput> {
  const prompt = buildPrompt(input);

  try {
    const chatCompletion = await groq.chat.completions.create({
      messages: [{ role: 'user', content: prompt }],
      model: 'qwen/qwen2-72b-instruct',
      temperature: 0.8,
      response_format: { type: 'json_object' },
    });

    const content = chatCompletion.choices[0]?.message?.content;
    if (!content) {
      console.warn('Groq API returned no content, using fallback.');
      return fallbackResponse();
    }
    
    const parsedOutput = JSON.parse(content);
    const validationResult = GenerateWrapOutputSchema.safeParse(parsedOutput);

    if (!validationResult.success) {
        console.error('Groq response failed Zod validation:', validationResult.error);
        return fallbackResponse();
    }
    
    let output = validationResult.data;
    
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

  } catch (error) {
    console.error('Error calling Groq API:', error);
    return fallbackResponse();
  }
}
