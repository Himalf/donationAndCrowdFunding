import { Module } from '@nestjs/common';
import { TypeOrmModule } from '@nestjs/typeorm';
import { ConfigModule } from '@nestjs/config';
import { UsersModule } from './users/users.module';
import { User } from './users/entities/user.entity';
import { CampaignsModule } from './campaigns/campaigns.module';
import { AuthService } from './auth/auth.service';
import { AuthController } from './auth/auth.controller';
import { AuthModule } from './auth/auth.module';
import { UpdatesModule } from './updates/updates.module';
import { DonationsModule } from './donations/donations.module';
import { PaymentDetailsModule } from './payment-details/payment-details.module';
import { ServeStaticModule } from '@nestjs/serve-static';
import { join } from 'path';
import { MailerModule } from '@nestjs-modules/mailer';
import { hostname } from 'os';
@Module({
  imports: [
    MailerModule.forRoot({
      transport: {
        host: 'smtp.gmail.com', // Your email host (e.g., Gmail, SMTP server)
        port: 587,
        auth: {
          user: 'himal.fullel15@gmail.com', // Your email
          pass: 'fqsm ighf gltq lqxb', // Your email password
        },
      },
      defaults: {
        from: '"Donation and Crowdfunding App" <himal.fullel15@gmail.com>',
      },
    }),
    ConfigModule.forRoot({
      isGlobal: true,
    }),
    ServeStaticModule.forRoot({
      rootPath: join(__dirname, '..', 'uploads'),
      serveRoot: '/uploads',
    }),
    TypeOrmModule.forRoot({
      type: 'postgres',
      host: process.env.DB_HOST,
      port: Number(process.env.DB_PORT),
      username: process.env.DB_USER,
      password: process.env.DB_PASS,
      database: process.env.DB_NAME,
      // entities: [User],
      autoLoadEntities: true,
      synchronize: true,
      migrationsTableName: 'typeorm_migrations',
      migrationsRun: false,
      logging: true,
    }),
    UsersModule,
    CampaignsModule,
    AuthModule,
    UpdatesModule,
    DonationsModule,
    PaymentDetailsModule,
  ],
  controllers: [],
  providers: [],
})
export class AppModule {}
