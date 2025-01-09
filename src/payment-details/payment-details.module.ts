import { Module } from '@nestjs/common';
import { PaymentDetailsService } from './payment-details.service';
import { PaymentDetailsController } from './payment-details.controller';
import { TypeOrmModule } from '@nestjs/typeorm';
import { Donation } from 'src/donations/entities/donation.entity';
import { PaymentDetail } from './entities/payment-detail.entity';

@Module({
  imports: [TypeOrmModule.forFeature([Donation, PaymentDetail])],
  controllers: [PaymentDetailsController],
  providers: [PaymentDetailsService],
})
export class PaymentDetailsModule {}
