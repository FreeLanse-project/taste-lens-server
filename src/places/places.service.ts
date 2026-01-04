import {
  Injectable,
  BadRequestException,
  Logger,
  UnauthorizedException,
} from '@nestjs/common';
import { PrismaService } from 'src/prisma.service';
import { CreatePlaceDto } from './dto/create-places.dto';
import { UpdatePlaceDto } from './dto/update-places.dto';
import { Place, place_status } from '@prisma/client';
import { SendEmailHelper } from 'src/utils/helpers/sending-email.helper';
import { Account } from 'src/account/entities/account-entity';
import { ConfigService } from '@nestjs/config/dist/config.service';
import { EnvVariables } from 'src/configurations/configuration.interface';

@Injectable()
export class PlaceService {
  private readonly logger = new Logger(PlaceService.name);

  constructor(
    private prisma: PrismaService,
    private sendEmailHelper: SendEmailHelper,
    private readonly configService: ConfigService<EnvVariables>,
  ) {}

  async create(
    createPlaceDto: CreatePlaceDto,
    account: Account,
  ): Promise<Place> {
    try {
      return await this.prisma.place.create({
        data: {
          ...createPlaceDto,
          status: 'pending',
          account_id: account.id,
        },
      });
    } catch (error) {
      this.logger.error(error);
      throw new BadRequestException(error.message);
    }
  }

  async findAllAdmin(): Promise<Place[]> {
    return this.prisma.place.findMany({
      where: { status: { in: ['pending', 'active', 'rejected'] } },
      include: { account: true },
    });
  }

  async findAllUser(): Promise<Place[]> {
    return this.prisma.place.findMany({
      where: { status: 'active' },
      include: { account: true },
    });
  }

  async approvePlace(id: number, account: Account): Promise<Place> {
    if (account.account_type !== 'admin') {
      throw new UnauthorizedException('Only admins can perform this action');
    }

    try {
      const place = await this.prisma.place.update({
        where: { id },
        data: { status: 'active' },
        include: {
          account: true,
        },
      });

      if (!place) {
        throw new BadRequestException('Place not found');
      }

      await this.sendEmailHelper.sendEmail(
        place.account.email,
        'place-approved',
        'تم تفعيل مكانك!',
        {
          placeName: place.name,
          city: place.city ?? 'N/A',
          country: place.country ?? 'N/A',
          budget: place.budget ?? 'N/A',
        },
      );

      this.logger.log(
        `Place approved and email sent to ${place.account.email}`,
      );

      return place;
    } catch (error) {
      this.logger.error(error);
      throw new BadRequestException(error.message);
    }
  }

  async rejectPlace(id: number, account: Account): Promise<Place> {
    if (account.account_type !== 'admin') {
      throw new UnauthorizedException('Only admins can perform this action');
    }

    try {
      return await this.prisma.place.update({
        where: { id },
        data: { status: 'rejected' as place_status },
      });
    } catch (error) {
      this.logger.error(error);
      throw new BadRequestException(error.message);
    }
  }

  async findOne(id: number): Promise<Place> {
    return this.prisma.place.findUnique({ where: { id } });
  }

  async update(id: number, updatePlaceDto: UpdatePlaceDto): Promise<Place> {
    try {
      return await this.prisma.place.update({
        where: { id },
        data: updatePlaceDto,
      });
    } catch (error) {
      this.logger.error(error);
      throw new BadRequestException(error.message);
    }
  }
}
