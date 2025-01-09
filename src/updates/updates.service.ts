import { Injectable, NotFoundException } from '@nestjs/common';
import { CreateUpdateDto } from './dto/create-update.dto';
import { UpdateUpdateDto } from './dto/update-update.dto';
import { InjectRepository } from '@nestjs/typeorm';
import { Update } from './entities/update.entity';
import { DeleteResult, Repository } from 'typeorm';
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

  async findAll(): Promise<Update[]> {
    return this.updateRepository.find({ relations: ['campaign'] });
  }

  async findOne(update_id: number): Promise<Update> {
    return this.updateRepository.findOne({
      where: { update_id },
      relations: ['campaign'],
    });
  }

  async update(
    update_id: number,
    updateUpdateDto: UpdateUpdateDto,
  ): Promise<Update> {
    const update = await this.updateRepository.findOne({
      where: { update_id },
    });
    if (!update) {
      throw new NotFoundException();
    }
    const campaigns = await this.campaignRepository.findOne({
      where: { campaign_id: updateUpdateDto.campaign_id },
    });
    if (!campaigns) {
      throw new NotFoundException();
    }
    const updateData = this.updateRepository.create({
      campaign: campaigns,
      ...update,
      ...updateUpdateDto,
    });
    return this.updateRepository.save(updateData);
  }

  async remove(update_id: number): Promise<DeleteResult> {
    return this.updateRepository.delete(update_id);
  }
}
