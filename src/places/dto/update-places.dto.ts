import { ApiProperty } from '@nestjs/swagger';
import { IsOptional, IsString, IsEnum } from 'class-validator';
import { place_status, place_type } from '@prisma/client';

export class UpdatePlaceDto {
  @IsOptional()
  @IsString()
  @ApiProperty({ required: false })
  name?: string;

  @IsOptional()
  @IsEnum(place_type)
  @ApiProperty({ required: false, enum: place_type })
  type?: place_type;

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

  @IsOptional()
  @IsEnum(place_status)
  @ApiProperty({ required: false, enum: place_status })
  status?: place_status;
}
