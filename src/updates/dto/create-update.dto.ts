import { IsNumber, IsString } from 'class-validator';

export class CreateUpdateDto {
  @IsString()
  message: number;
  @IsNumber()
  campaign_id: number;
}
