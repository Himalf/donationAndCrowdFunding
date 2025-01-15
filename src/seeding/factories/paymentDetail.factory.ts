import { PaymentDetail } from 'src/payment-details/entities/payment-detail.entity';
import { setSeederFactory } from 'typeorm-extension';
import { faker } from '@faker-js/faker';
import { PaymentMethod } from 'src/payment-details/dto/paymentMethod.enum';
import { PaymentStatus } from 'src/payment-details/dto/paymentstatus.enum';
import { v4 as uuidv4 } from 'uuid';
export const paymentDetailFactory = setSeederFactory(PaymentDetail, () => {
  const paymentDetail = new PaymentDetail();
  paymentDetail.payment_method = faker.helpers.arrayElement([
    PaymentMethod.BANK_TRANSFER,
    PaymentMethod.CASH,
    PaymentMethod.CREDIT_CARD,
    PaymentMethod.CRYPTOCURRENCY,
    PaymentMethod.DEBIT_CARD,
    PaymentMethod.ESEWA,
    PaymentMethod.KHALTI,
  ]);
  paymentDetail.status = faker.helpers.arrayElement([
    PaymentStatus.FAILED,
    PaymentStatus.PENDING,
    PaymentStatus.SUCCESS,
  ]);
  paymentDetail.transaction_id = parseInt(uuidv4());
  return paymentDetail;
});
