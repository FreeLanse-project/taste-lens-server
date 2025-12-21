import { ApiProperty } from '@nestjs/swagger';
import { IsString, IsNumber, Min, Max } from 'class-validator';

export class AiRecommendationDto {
  @ApiProperty({ example: 'single' })
  @IsString()
  relationship_status: string;

  @ApiProperty({ example: 'low | medium | high' })
  @IsString()
  budget: string;

  @ApiProperty({ example: 'Amman' })
  @IsString()
  city: string;

  @ApiProperty({ example: 'sad | family | fun' })
  @IsString()
  mood: string;

  @ApiProperty({ example: 25 })
  @IsNumber()
  @Min(16)
  @Max(70)
  age: number;
}
