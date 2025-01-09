import { Module } from '@nestjs/common';
import { DonationsService } from './donations.service';
import { DonationsController } from './donations.controller';
import { TypeOrmModule } from '@nestjs/typeorm';
import { User } from 'src/users/entities/user.entity';
import { Campaign } from 'src/campaigns/entities/campaign.entity';
import { Donation } from './entities/donation.entity';

@Module({
  imports: [TypeOrmModule.forFeature([User, Campaign, Donation])],
  controllers: [DonationsController],
  providers: [DonationsService],
})
export class DonationsModule {}
