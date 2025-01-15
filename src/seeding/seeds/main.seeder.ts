import { faker } from '@faker-js/faker';
import { Campaign } from 'src/campaigns/entities/campaign.entity';
import { User } from 'src/users/entities/user.entity';
import { DataSource } from 'typeorm';
import { Seeder, SeederFactoryManager } from 'typeorm-extension';

export default class MainSeeder implements Seeder {
  public async run(
    dataSource: DataSource,
    factoryManager: SeederFactoryManager,
  ): Promise<any> {
    const campaignRepository = dataSource.getRepository(Campaign);
    const userFactory = factoryManager.get(User);
    const campaignFactory = factoryManager.get(Campaign);

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
  }
}
