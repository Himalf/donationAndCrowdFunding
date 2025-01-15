import { faker } from '@faker-js/faker/.';
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
    const users = await userFactory.saveMany(7);
    const campaign = await Promise.all(
      Array(17)
        .fill('')
        .map(async () => {
          const made = await campaignFactory.make({
            user: faker.helpers.arrayElement(users),
          });
          return made;
        }),
    );
    await campaignRepository.save(campaign);
  }
}
