import { Injectable, Logger } from '@nestjs/common';
import OpenAI from 'openai';
import { ConfigService } from '@nestjs/config';
import { EnvVariables } from 'src/configurations/configuration.interface';
import { AiRecommendationDto } from './dto/ai-recommendation.dto';

export interface PlaceRecommendation {
  name: string;
  type: string;
  description: string;
  location: string;
  budget: string;
  reason: string;
}

@Injectable()
export class PlaceAiService {
  private openai: OpenAI;
  private readonly logger = new Logger(PlaceAiService.name);

  constructor(private readonly configService: ConfigService<EnvVariables>) {
    this.openai = new OpenAI({
      apiKey: this.configService.get('OPEN_AI_KEY'),
    });
  }

  async recommend(dto: AiRecommendationDto): Promise<PlaceRecommendation[]> {
    const prompt = `
You are a local food & cafe expert.

Based on the following user data:
- City: ${dto.city}
- Mood: ${dto.mood}
- Budget: ${dto.budget}
- Age: ${dto.age}
- Relationship status: ${dto.relationship_status}

Suggest exactly 6 places.
For each place, return the following fields:
- name
- type (cafe or restaurant)
- description (short description about the place)
- location (address or general location)
- budget (low, medium, high)
- reason (why this place is recommended for the user)

Return JSON ONLY like this:

[
  {
    "name": "string",
    "type": "string",
    "description": "string",
    "location": "string",
    "budget": "string",
    "reason": "string"
  }
]

Do NOT add any extra text, explanation, or backticks. Return only valid JSON.
`;

    const res = await this.openai.chat.completions.create({
      model: 'gpt-4o-mini',
      temperature: 0.3,
      messages: [{ role: 'user', content: prompt }],
    });

    let text = res.choices?.[0]?.message?.content?.trim();

    try {
      return JSON.parse(text);
    } catch (err) {
      text = text.replace(/^[`]+|[`]+$/g, '');
      try {
        return JSON.parse(text);
      } catch (err2) {
        this.logger.error('Failed to parse OpenAI response', err2);
        return [];
      }
    }
  }
}
