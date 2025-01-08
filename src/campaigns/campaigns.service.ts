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

  findOne(id: number) {
    return `This action returns a #${id} campaign`;
  }

  update(id: number, updateCampaignDto: UpdateCampaignDto) {
    return `This action updates a #${id} campaign`;
  }

  remove(id: number) {
    return `This action removes a #${id} campaign`;
  }
}
