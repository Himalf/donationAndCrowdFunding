import { IsEnum, IsNumber, IsString } from 'class-validator';
import { CampaignStatus } from './campaignStatus.enum';
import { ApiProperty } from '@nestjs/swagger';

export class CreateCampaignDto {
  @ApiProperty()
  @IsString()
  title: string;
  @ApiProperty()
  @IsString()
  description: string;
  @ApiProperty()
  @IsNumber()
  goal_amount: number;
  @ApiProperty()
  @IsString()
  start_date: string;
  @ApiProperty()
  @IsString()
  end_date: string;
  @ApiProperty()
  @IsEnum(CampaignStatus)
  status: CampaignStatus;
  @ApiProperty()
  @IsNumber()
  user_id: number;
}
