import { Injectable, NotFoundException } from '@nestjs/common';
import { CreatePaymentDetailDto } from './dto/create-payment-detail.dto';
import { UpdatePaymentDetailDto } from './dto/update-payment-detail.dto';
import { InjectRepository } from '@nestjs/typeorm';
import { PaymentDetail } from './entities/payment-detail.entity';
import { DeleteResult, Repository } from 'typeorm';
import { Donation } from 'src/donations/entities/donation.entity';

@Injectable()
export class PaymentDetailsService {
  constructor(
    @InjectRepository(PaymentDetail)
    private readonly paymentRepository: Repository<PaymentDetail>,
    @InjectRepository(Donation)
    private readonly donationRepository: Repository<Donation>,
  ) {}

  async create(
    createPaymentDetailDto: CreatePaymentDetailDto,
  ): Promise<PaymentDetail> {
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

  async findAll(): Promise<PaymentDetail[]> {
    return this.paymentRepository.find({ relations: ['donation'] });
  }

  async findOne(paymentDetail_id: number) {
    return this.paymentRepository.findOne({
      where: { paymentDetail_id },
      relations: ['donation'],
    });
  }

  async update(
    paymentDetail_id: number,
    updatePaymentDetailDto: UpdatePaymentDetailDto,
  ): Promise<PaymentDetail> {
    const paymentDetail = await this.paymentRepository.findOne({
      where: { paymentDetail_id },
    });
    if (!paymentDetail) {
      throw new NotFoundException();
    }
    const donations = await this.donationRepository.findOne({
      where: { donation_id: updatePaymentDetailDto.donation_id },
    });
    if (!donations) {
      throw new NotFoundException();
    }
    const updatePaymentDetail = this.paymentRepository.create({
      ...paymentDetail,
      donation: donations,
      ...updatePaymentDetailDto,
    });
    return this.paymentRepository.save(updatePaymentDetail);
  }

  async remove(paymentDetail_id: number): Promise<DeleteResult> {
    return this.paymentRepository.delete(paymentDetail_id);
  }
}
