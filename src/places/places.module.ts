import { Module } from '@nestjs/common';
import { PlaceService } from './places.service';
import { PlaceController } from './places.controller';
import { AccountService } from 'src/account/account.service';
import { PrismaService } from 'src/prisma.service';
import { SendEmailHelper } from 'src/utils/helpers/sending-email.helper';
import { AuthService } from 'src/auth/auth.service';
import { JwtService } from '@nestjs/jwt';
import { ConfigService } from '@nestjs/config/dist/config.service';
import { PlaceAiService } from './place-ai.service';
@Module({
  controllers: [PlaceController],

  providers: [
    PrismaService,
    SendEmailHelper,
    AccountService,
    PlaceService,
    AuthService,
    JwtService,
    PlaceAiService,
    ConfigService,
  ],
})
export class PlacesModule {}
