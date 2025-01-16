import { DataSource } from 'typeorm';
import { join } from 'path';
import { User } from 'src/users/entities/user.entity';
import { Campaign } from 'src/campaigns/entities/campaign.entity';
import { Donation } from 'src/donations/entities/donation.entity';
import { PaymentDetail } from 'src/payment-details/entities/payment-detail.entity';
import { Update } from 'src/updates/entities/update.entity';

export const connectionSource = new DataSource({
  type: 'postgres',
  host: 'localhost',
  port: 5432,
  username: 'postgres',
  password: 'himal',
  database: 'crowdfunding',
  logging: true,
  entities: [User, Campaign, Donation, PaymentDetail, Update],
  migrations: [join(__dirname, '/../../', 'database/migrations/**/*{.ts,.js}')],
  synchronize: false,
  migrationsTableName: 'typeorm_migrations',
  migrationsRun: false,
});
