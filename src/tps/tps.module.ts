import { Module } from '@nestjs/common';
import { TpsService } from './tps.service';
import { TpsController } from './tps.controller';
import { PrismaService } from 'nestjs-prisma';

@Module({
  controllers: [TpsController],
  providers: [TpsService,PrismaService],
})
export class TpsModule {}
