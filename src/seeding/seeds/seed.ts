import { Campaign } from 'src/campaigns/entities/campaign.entity';
import { User } from 'src/users/entities/user.entity';
import { DataSource, DataSourceOptions } from 'typeorm';
import { runSeeders, SeederOptions } from 'typeorm-extension';
import { UsersFactory } from 'src/seeding/factories/user.factory';
import { campaignFactory } from 'src/seeding/factories/campaign.factory';
import MainSeeder from './main.seeder';
import { Donation } from 'src/donations/entities/donation.entity';
import { PaymentDetail } from 'src/payment-details/entities/payment-detail.entity';
import { Update } from 'src/updates/entities/update.entity';
import { donationFactory } from '../factories/donation.factory';
import { updatesFactory } from '../factories/updates.factory';

const options: DataSourceOptions & SeederOptions = {
  type: 'postgres',
  host: process.env.DB_HOST || 'localhost',
  port: Number(process.env.DB_PORT) || 5432,
  username: process.env.DB_USER || 'postgres',
  password: process.env.DB_PASS || 'himal',
  database: process.env.DB_NAME || 'crowdfunding',
  entities: [User, Campaign, Donation, PaymentDetail, Update],
  synchronize: true,
  factories: [UsersFactory, campaignFactory, donationFactory, updatesFactory],
  seeds: [MainSeeder],
};

const dataSource = new DataSource(options);

dataSource.initialize().then(async () => {
  await dataSource.synchronize(true);
  await runSeeders(dataSource);
  process.exit();
});
