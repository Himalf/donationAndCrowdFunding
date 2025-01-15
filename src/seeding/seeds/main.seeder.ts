import { faker } from '@faker-js/faker';
import { Campaign } from 'src/campaigns/entities/campaign.entity';
import { Donation } from 'src/donations/entities/donation.entity';
import { PaymentDetail } from 'src/payment-details/entities/payment-detail.entity';
import { Update } from 'src/updates/entities/update.entity';
import { User } from 'src/users/entities/user.entity';
import { DataSource } from 'typeorm';
import { Seeder, SeederFactoryManager } from 'typeorm-extension';

export default class MainSeeder implements Seeder {
  public async run(
    dataSource: DataSource,
    factoryManager: SeederFactoryManager,
  ): Promise<any> {
    const campaignRepository = dataSource.getRepository(Campaign);
    const donationRepository = dataSource.getRepository(Donation);
    const updateRepository = dataSource.getRepository(Update);
    const paymentDetailRepository = dataSource.getRepository(PaymentDetail);
    const userFactory = factoryManager.get(User);
    const campaignFactory = factoryManager.get(Campaign);
    const donationFactory = factoryManager.get(Donation);
    const updatesFactory = factoryManager.get(Update);
    const paymentDetailFactory = factoryManager.get(PaymentDetail);
    const user = await userFactory.saveMany(7);

    const campaigns = await Promise.all(
      Array(17)
        .fill(null)
        .map(() =>
          campaignFactory.make({
            user: faker.helpers.arrayElement(user),
          }),
        ),
    );

    await campaignRepository.save(campaigns);

    const donations = await Promise.all(
      Array(20)
        .fill(null)
        .map(() =>
          donationFactory.make({
            user: faker.helpers.arrayElement(user),
            campaign: faker.helpers.arrayElement(campaigns),
          }),
        ),
    );
    await donationRepository.save(donations);

    const updates = await Promise.all(
      Array(20)
        .fill(null)
        .map(() =>
          updatesFactory.make({
            campaign: faker.helpers.arrayElement(campaigns),
          }),
        ),
    );
    await updateRepository.save(updates);

    const paymentDetails = await Promise.all(
      Array(20)
        .fill(null)
        .map(() =>
          paymentDetailFactory.make({
            donation: faker.helpers.arrayElement(donations),
          }),
        ),
    );
    await paymentDetailRepository.save(paymentDetails);
  }
}
