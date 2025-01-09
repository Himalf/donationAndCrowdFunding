import { IsEnum, IsNumber } from 'class-validator';
import { PaymentMethod } from './paymentMethod.enum';
import { PaymentStatus } from './paymentstatus.enum';

export class CreatePaymentDetailDto {
  @IsNumber()
  donation_id: number;
  @IsEnum(PaymentMethod)
  payment_method: PaymentMethod;
  @IsNumber()
  transaction_id: number;
  @IsEnum(PaymentStatus)
  status: PaymentStatus;
}
