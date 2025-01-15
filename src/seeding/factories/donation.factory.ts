import { Donation } from 'src/donations/entities/donation.entity';
import { setSeederFactory } from 'typeorm-extension';
import { faker } from '@faker-js/faker';
export const donationFactory = setSeederFactory(Donation, () => {
  const donation = new Donation();
  donation.amount = parseInt(faker.finance.amount({ min: 1000, max: 100000 }));
  return donation;
});
