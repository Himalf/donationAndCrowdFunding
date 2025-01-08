import { IsEnum, IsNumber, IsString } from 'class-validator';
import { CampaignStatus } from './campaignStatus.enum';

export class CreateCampaignDto {
  @IsString()
  title: string;
  @IsString()
  description: string;
  @IsNumber()
  goal_amount: number;
  @IsString()
  start_date: string;
  @IsString()
  end_date: string;
  @IsEnum(CampaignStatus)
  status: CampaignStatus;
  @IsNumber()
  user_id: number;
}
