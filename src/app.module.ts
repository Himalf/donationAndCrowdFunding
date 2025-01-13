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
@Module({
  imports: [
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
      entities: [User],
      autoLoadEntities: true,
      synchronize: true,
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
