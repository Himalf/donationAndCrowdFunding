import { Injectable, NotFoundException } from '@nestjs/common';
import { CreateDonationDto } from './dto/create-donation.dto';
import { UpdateDonationDto } from './dto/update-donation.dto';
import { InjectRepository } from '@nestjs/typeorm';
import { Donation } from './entities/donation.entity';
import { DeleteResult, Repository } from 'typeorm';
import { User } from 'src/users/entities/user.entity';
import { Campaign } from 'src/campaigns/entities/campaign.entity';

@Injectable()
export class DonationsService {
  constructor(
    @InjectRepository(Donation)
    private readonly donationRepository: Repository<Donation>,
    @InjectRepository(User)
    private readonly userRepository: Repository<User>,
    @InjectRepository(Campaign)
    private readonly campaignRepository: Repository<Campaign>,
  ) {}
  async create(createDonationDto: CreateDonationDto): Promise<Donation> {
    const users = await this.userRepository.findOne({
      where: { user_id: createDonationDto.user_id },
    });
    if (!users) {
      throw new NotFoundException();
    }
    const campaigns = await this.campaignRepository.findOne({
      where: { campaign_id: createDonationDto.campaign_id },
    });
    if (!campaigns) {
      throw new NotFoundException();
    }
    const createDonations = this.donationRepository.create({
      user: users,
      campaign: campaigns,
      ...createDonationDto,
    });
    return this.donationRepository.save(createDonations);
  }

  async findAll(): Promise<Donation[]> {
    return this.donationRepository.find({ relations: ['user', 'campaign'] });
  }

  async findOne(donation_id: number): Promise<Donation> {
    return this.donationRepository.findOne({
      where: { donation_id },
      relations: ['user', 'campaign'],
    });
  }

  async update(
    donation_id: number,
    updateDonationDto: UpdateDonationDto,
  ): Promise<Donation> {
    const users = await this.userRepository.findOne({
      where: { user_id: updateDonationDto.user_id },
    });
    if (!users) {
      throw new NotFoundException();
    }
    const campaigns = await this.campaignRepository.findOne({
      where: { campaign_id: updateDonationDto.campaign_id },
    });
    if (!campaigns) {
      throw new NotFoundException();
    }
    const donation = await this.donationRepository.findOne({
      where: { donation_id },
    });
    const updateDonation = this.donationRepository.create({
      user: users,
      campaign: campaigns,
      ...donation,
      ...updateDonationDto,
    });
    return this.donationRepository.save(updateDonation);
  }

  async remove(donation_id: number): Promise<DeleteResult> {
    return this.donationRepository.delete(donation_id);
  }
}
