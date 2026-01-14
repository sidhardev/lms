import { Module } from '@nestjs/common';
import { AppController } from './app.controller';
import { AppService } from './app.service';
import { ConfigModule } from '@nestjs/config';
import { TypeOrmModule } from '@nestjs/typeorm';
import { AuthModule } from './auth/auth.module';
import { JwtModule } from '@nestjs/jwt';
import { UserModule } from './user/user.module';
import { User } from './user/user.entity';
import { MailModule } from './mail/mail.module';
import { ConfigService } from '@nestjs/config';
import { JwtService } from '@nestjs/jwt';
import { CouponsModule } from './coupons/coupons.module';
import { Coupon } from './coupons/coupon.entity';
import { AdminCouponsController } from './coupons/admin/admin-coupons.controller';
import { AdminModule } from './coupons/admin/admin-coupons.module';
import { CouponRedemption } from './coupons/redemptions/coupon-redemption.entity';
import { CampaignsController } from './campaigns/campaigns.controller';
import { CampaignsService } from './campaigns/campaigns.service';
import { CampaignsModule } from './campaigns/campaigns.module';
import { campaign } from './campaigns/campaign.entity';
import { RedemptionController } from './redemption/redemption.controller';
import { RedemptionModule } from './redemption/redemption.module';
import { LoyaltyProgramController } from './loyalty-program/loyalty-program.controller';
import { LoyaltyProgramModule } from './loyalty-program/loyalty-program.module';
import { NotificationsController } from './notifications/notifications.controller';
import { NotificationsService } from './notifications/notifications.service';
import { NotificationsModule } from './notifications/notifications.module';
import { SegmentModule } from './segment/segment.module';

@Module({
  imports: [
    ConfigModule.forRoot({ isGlobal: true }),
    TypeOrmModule.forRoot({
      type: 'postgres',
      host: process.env.DB_HOST,
      port: Number(process.env.DB_PORT),
      username: process.env.DB_USERNAME,
      password: process.env.DB_PASSWORD,
      database: process.env.DB_NAME,
      autoLoadEntities: true,
      synchronize: true,
    }),
    JwtModule.registerAsync({
      inject: [ConfigService],
      useFactory: (configService: ConfigService) => ({
        secret: configService.get<string>('JWT_SECRET') || 'keysecret',
        signOptions: {
          expiresIn: '1d',
        },
      }),
    }),
    UserModule,
    AuthModule,
    MailModule,
    CouponsModule,
    AdminModule,
    CampaignsModule,
    RedemptionModule,
    LoyaltyProgramModule,
    NotificationsModule,
    SegmentModule,
  ],
  controllers: [
    AppController,
    CampaignsController,
    RedemptionController,
    LoyaltyProgramController,
    NotificationsController,
  ],
  providers: [AppService, NotificationsService],
})
export class AppModule {}
