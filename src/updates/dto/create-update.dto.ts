import { IsNumber, IsString } from 'class-validator';

export class CreateUpdateDto {
  @IsString()
  message: string;
  @IsNumber()
  campaign_id: number;
}
