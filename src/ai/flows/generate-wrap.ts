
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
  const schemaString = JSON.stringify(
    {
      roast: 'string',
      achievements: [
        {
          icon: "'Trophy' | 'Flame' | 'BrainCircuit' | 'GitPullRequest' | 'Rocket' | 'Code'",
          title: 'string',
          description: 'string',
          rarity: "'Legendary' | 'Epic' | 'Rare' | 'Common'",
          color: "'yellow' | 'purple' | 'blue' | 'gray'",
        },
      ],
    },
    null,
    2
  );

  return `You are a brutally honest and sarcastic code critic. Your job is to analyze a GitHub user's 2025 activity and generate a JSON object.

Your response MUST be a single, valid JSON object and nothing else. The JSON object must conform to the following structure:
${schemaString}

User Data:
- Username: ${input.username}
- Contribution Count: ${input.contributionCount}
- Commit Count: ${input.commitCount}
- Top Language: ${input.mostUsedLanguage}
- Recent Commit Messages: ${JSON.stringify(input.commitMessages)}
- Repository Names: ${JSON.stringify(input.repos)}

ROAST GUIDELINES:
- Generate a "roast": An unfiltered, brutally honest, and savage 2-3 line roast.
- Use programming humor and technical references to highlight their flaws.
- Example: "${input.contributionCount} contributions? I've seen more activity in a commented-out block of code."

ACHIEVEMENT GUIDELINES:
- Generate an "achievements" array with exactly 4 unique objects.
- They should sound like achievements but have a sarcastic or backhanded compliment.
- Example: { "icon": "Flame", "title": "Keyboard Enthusiast", "description": "You typed a lot of characters. Some of them even compiled.", "rarity": "Common", "color": "gray" }

Return ONLY the raw JSON object. Do not wrap it in markdown or any other text.
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
      model: 'qwen/qwen3-32b',
      temperature: 0.8,
      response_format: { type: 'json_object' },
    });

    const content = chatCompletion.choices[0]?.message?.content;
    if (!content) {
      console.warn('Groq API returned no content, using fallback.');
      return fallbackResponse();
    }
    
    let parsedJson = JSON.parse(content);

    // Defensive parsing: find the actual data if it's nested
    if (parsedJson.roast === undefined || parsedJson.achievements === undefined) {
      const keys = Object.keys(parsedJson);
      if (keys.length === 1 && typeof parsedJson[keys[0]] === 'object') {
        parsedJson = parsedJson[keys[0]]; // Assume the data is nested under the single key
      }
    }

    const validationResult = GenerateWrapOutputSchema.safeParse(parsedJson);

    if (!validationResult.success) {
        console.error('Groq response failed Zod validation after parsing:', validationResult.error);
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
    console.error('Error calling Groq API or parsing response:', error);
    return fallbackResponse();
  }
}
