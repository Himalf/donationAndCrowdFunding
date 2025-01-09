import { Module } from '@nestjs/common';
import { UpdatesService } from './updates.service';
import { UpdatesController } from './updates.controller';
import { TypeOrmModule } from '@nestjs/typeorm';
import { Update } from './entities/update.entity';
import { Campaign } from 'src/campaigns/entities/campaign.entity';

@Module({
  imports: [TypeOrmModule.forFeature([Update, Campaign])],
  controllers: [UpdatesController],
  providers: [UpdatesService],
})
export class UpdatesModule {}
