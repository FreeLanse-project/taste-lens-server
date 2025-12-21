import { ApiProperty } from '@nestjs/swagger';
import { IsString, IsOptional, IsEnum } from 'class-validator';
import { place_type } from '@prisma/client';

export class CreatePlaceDto {
  @IsString()
  @ApiProperty()
  name: string;

  @IsEnum(place_type)
  @ApiProperty({ enum: place_type })
  type: place_type;

  @IsOptional()
  @IsString()
  @ApiProperty({ required: false })
  description?: string;

  @IsOptional()
  @IsString()
  @ApiProperty({ required: false })
  city?: string;

  @IsOptional()
  @IsString()
  @ApiProperty({ required: false })
  country?: string;

  @IsOptional()
  @IsString()
  @ApiProperty({ required: false })
  budget?: string;
}
