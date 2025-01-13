import { ApiProperty } from '@nestjs/swagger';
import { IsNumber } from 'class-validator';

export class CreateDonationDto {
  @ApiProperty()
  @IsNumber()
  user_id: number;
  @ApiProperty()
  @IsNumber()
  amount: number;
  @ApiProperty()
  @IsNumber()
  campaign_id: number;
}
