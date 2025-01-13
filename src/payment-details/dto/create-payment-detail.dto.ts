import { IsEnum, IsNumber } from 'class-validator';
import { PaymentMethod } from './paymentMethod.enum';
import { PaymentStatus } from './paymentstatus.enum';
import { ApiProperty } from '@nestjs/swagger';
export class CreatePaymentDetailDto {
  @ApiProperty()
  @IsNumber()
  donation_id: number;
  @ApiProperty({ enum: PaymentMethod })
  @IsEnum(PaymentMethod)
  payment_method: PaymentMethod;
  @IsNumber()
  transaction_id: number;
  @IsEnum(PaymentStatus)
  status: PaymentStatus;
}
