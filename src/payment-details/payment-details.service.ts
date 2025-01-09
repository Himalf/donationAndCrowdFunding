import { Injectable, NotFoundException } from '@nestjs/common';
import { CreatePaymentDetailDto } from './dto/create-payment-detail.dto';
import { UpdatePaymentDetailDto } from './dto/update-payment-detail.dto';
import { InjectRepository } from '@nestjs/typeorm';
import { PaymentDetail } from './entities/payment-detail.entity';
import { Repository } from 'typeorm';
import { Donation } from 'src/donations/entities/donation.entity';

@Injectable()
export class PaymentDetailsService {
  constructor(
    @InjectRepository(PaymentDetail)
    private readonly paymentRepository: Repository<PaymentDetail>,
    @InjectRepository(Donation)
    private readonly donationRepository: Repository<Donation>,
  ) {}

  async create(createPaymentDetailDto: CreatePaymentDetailDto) {
    const donations = await this.donationRepository.findOne({
      where: { donation_id: createPaymentDetailDto.donation_id },
    });
    if (!donations) {
      throw new NotFoundException();
    }
    const paymentData = this.paymentRepository.create({
      donation: donations,
      ...createPaymentDetailDto,
    });

    return this.paymentRepository.save(paymentData);
  }

  findAll() {
    return `This action returns all paymentDetails`;
  }

  findOne(id: number) {
    return `This action returns a #${id} paymentDetail`;
  }

  update(id: number, updatePaymentDetailDto: UpdatePaymentDetailDto) {
    return `This action updates a #${id} paymentDetail`;
  }

  remove(id: number) {
    return `This action removes a #${id} paymentDetail`;
  }
}
