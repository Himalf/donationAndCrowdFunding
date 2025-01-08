import { Injectable, NotFoundException } from '@nestjs/common';
import { CreateCampaignDto } from './dto/create-campaign.dto';
import { UpdateCampaignDto } from './dto/update-campaign.dto';
import { Repository } from 'typeorm';
import { Campaign } from './entities/campaign.entity';
import { InjectRepository } from '@nestjs/typeorm';
import { User } from 'src/users/entities/user.entity';

@Injectable()
export class CampaignsService {
  constructor(
    @InjectRepository(Campaign)
    private readonly campaignRepository: Repository<Campaign>,
    @InjectRepository(User)
    private readonly userRepository: Repository<User>,
  ) {}
  async create(createCampaignDto: CreateCampaignDto) {
    const users = await this.userRepository.findOne({
      where: { user_id: createCampaignDto.user_id },
    });
    if (!users) {
      throw new NotFoundException(
        `The user with id:${users.user_id} is not found`,
      );
    }
    const campaignData = this.campaignRepository.create({
      user: users,
      ...createCampaignDto,
    });
    return await this.campaignRepository.save(campaignData);
  }

  async findAll() {
    return await this.campaignRepository.find({ relations: ['user'] });
  }

  async findOne(campaign_id: number) {
    return await this.campaignRepository.findOne({ where: { campaign_id } });
  }

  async update(campaign_id: number, updateCampaignDto: UpdateCampaignDto) {
    const campaign = await this.campaignRepository.findOne({
      where: { campaign_id },
    });
    if (!campaign) {
      throw new NotFoundException(
        `campaign with campaign_id: ${campaign_id} is not found`,
      );
    }
    const users = await this.userRepository.findOne({
      where: { user_id: updateCampaignDto.user_id },
    });
    const updateCampaignData = this.campaignRepository.create({
      user: users,
      ...campaign,
      ...updateCampaignDto,
    });
    return await this.campaignRepository.save(updateCampaignData);
  }

  remove(id: number) {
    return `This action removes a #${id} campaign`;
  }
}
