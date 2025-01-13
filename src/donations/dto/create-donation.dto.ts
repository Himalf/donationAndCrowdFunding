import { IsNumber } from 'class-validator';

export class CreateDonationDto {
  @IsNumber()
  user_id: number;
  @IsNumber()
  amount: number;
  @IsNumber()
  campaign_id: number;
}
