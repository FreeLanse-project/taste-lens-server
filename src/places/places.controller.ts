import { PlaceAiService } from './place-ai.service';
import {
  Controller,
  Post,
  Get,
  Patch,
  Param,
  Body,
  UseGuards,
} from '@nestjs/common';
import { ApiTags, ApiOperation, ApiSecurity, ApiParam } from '@nestjs/swagger';
import { PlaceService } from './places.service';
import { CreatePlaceDto } from './dto/create-places.dto';
import { UpdatePlaceDto } from './dto/update-places.dto';
import { CurrentAccount } from 'src/utils/decorators/account.decorator';
import { Account } from 'src/account/entities/account-entity';
import { CustomAuthGuard } from 'src/utils/guards/auth.guard';
import { ApiHeaders } from 'src/utils/decorators/header.decorator';
import { AiRecommendationDto } from './dto/ai-recommendation.dto';

@ApiTags('Places')
@ApiHeaders()
@Controller('places')
export class PlaceController {
  constructor(
    private readonly placeService: PlaceService,
    private readonly placeAiService: PlaceAiService,
  ) {}

  @UseGuards(CustomAuthGuard)
  @ApiSecurity('bearer')
  @Post()
  @ApiOperation({ summary: 'Create a new place (status pending)' })
  async create(
    @Body() createPlaceDto: CreatePlaceDto,
    @CurrentAccount() account: Account,
  ) {
    return this.placeService.create(createPlaceDto, account);
  }

  @UseGuards(CustomAuthGuard)
  @ApiSecurity('bearer')
  @Get('admin')
  @ApiOperation({ summary: 'Admin: Get all pending + active places' })
  async findAllAdmin() {
    return this.placeService.findAllAdmin();
  }

  @Get('user')
  @ApiOperation({ summary: 'User: Get all active places' })
  async findAllUser() {
    return this.placeService.findAllUser();
  }

  @UseGuards(CustomAuthGuard)
  @ApiSecurity('bearer')
  @Patch(':id/approve')
  @ApiOperation({ summary: 'Admin approves a place' })
  @ApiParam({ name: 'id', type: Number })
  async approve(@Param('id') id: number, @CurrentAccount() account: Account) {
    return this.placeService.approvePlace(id, account);
  }

  @UseGuards(CustomAuthGuard)
  @ApiSecurity('bearer')
  @Patch(':id/reject')
  @ApiOperation({ summary: 'Admin rejects a place' })
  @ApiParam({ name: 'id', type: Number })
  async reject(@Param('id') id: number, @CurrentAccount() account: Account) {
    return this.placeService.rejectPlace(id, account);
  }

  @Get(':id')
  @ApiOperation({ summary: 'Get place details by ID' })
  async findOne(@Param('id') id: number) {
    return this.placeService.findOne(id);
  }

  @UseGuards(CustomAuthGuard)
  @ApiSecurity('bearer')
  @Patch(':id')
  @ApiOperation({ summary: 'Update place details' })
  async update(
    @Param('id') id: number,
    @Body() updatePlaceDto: UpdatePlaceDto,
  ) {
    return this.placeService.update(id, updatePlaceDto);
  }

  @Post('ai-recommend')
  @UseGuards(CustomAuthGuard)
  @ApiSecurity('bearer')
  @ApiOperation({ summary: 'AI place recommendations' })
  async aiRecommend(@Body() dto: AiRecommendationDto) {
    return this.placeAiService.recommend(dto);
  }
}
