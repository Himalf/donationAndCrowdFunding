import { DataSource } from 'typeorm';
import { User } from '../../users/entities/user.entity';
import { Campaign } from '../../campaigns/entities/campaign.entity';
import { Donation } from '../../donations/entities/donation.entity';
import { PaymentDetail } from '../../payment-details/entities/payment-detail.entity';
import { Update } from '../../updates/entities/update.entity';

export const connectionSource = new DataSource({
  type: 'postgres',
  host: 'localhost',
  port: 5432,
  username: 'postgres',
  password: 'himal',
  database: 'crowdfunding',
  logging: true,
  entities: [User, Campaign, Donation, PaymentDetail, Update],
  migrations: ['dist/migrations/**/*.js'],
  synchronize: false,
  migrationsTableName: 'typeorm_migrations',
  migrationsRun: false,
});

connectionSource
  .initialize()
  .then(() => {
    console.log('DataSource has been initialized!');
  })
  .catch((err) => {
    console.error('Error during DataSource initialization', err);
  });
