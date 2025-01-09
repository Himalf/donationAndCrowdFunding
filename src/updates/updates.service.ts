import { Injectable, NotFoundException } from '@nestjs/common';
import { CreateUpdateDto } from './dto/create-update.dto';
import { UpdateUpdateDto } from './dto/update-update.dto';
import { InjectRepository } from '@nestjs/typeorm';
import { Update } from './entities/update.entity';
import { Repository } from 'typeorm';
import { Campaign } from 'src/campaigns/entities/campaign.entity';

@Injectable()
export class UpdatesService {
  constructor(
    @InjectRepository(Update)
    private readonly updateRepository: Repository<Update>,
    @InjectRepository(Campaign)
    private readonly campaignRepository: Repository<Campaign>,
  ) {}
  async create(createUpdateDto: CreateUpdateDto): Promise<Update> {
    const campaigns = await this.campaignRepository.findOne({
      where: { campaign_id: createUpdateDto.campaign_id },
    });
    if (!campaigns) {
      throw new NotFoundException(`campaign  is not found`);
    }
    const updateData = await this.updateRepository.create({
      campaign: campaigns,
      ...createUpdateDto,
    });
    return this.updateRepository.save(updateData);
  }

  findAll() {
    return `This action returns all updates`;
  }

  findOne(id: number) {
    return `This action returns a #${id} update`;
  }

  update(id: number, updateUpdateDto: UpdateUpdateDto) {
    return `This action updates a #${id} update`;
  }

  remove(id: number) {
    return `This action removes a #${id} update`;
  }
}
