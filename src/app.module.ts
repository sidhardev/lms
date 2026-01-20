import { Module } from '@nestjs/common';
import { AppController } from './app.controller';
import { AppService } from './app.service';
import { ConfigModule } from '@nestjs/config';
import { TypeOrmModule } from '@nestjs/typeorm';
import { AuthModule } from './auth/auth.module';
import { JwtModule } from '@nestjs/jwt';
import { UserModule } from './user/user.module';
 import { MailModule } from './mail/mail.module';
import { ConfigService } from '@nestjs/config';
 import { CouponsModule } from './coupons/coupons.module';
 import { AdminModule } from './coupons/admin/admin-coupons.module';
 import { NotificationsController } from './notifications/notifications.controller';
import { NotificationsService } from './notifications/notifications.service';
import { NotificationsModule } from './notifications/notifications.module';
import { SegmentModule } from './segment/segment.module';
import { PromotionModule } from './promotion/promotion.module';
import { CampaignsModule } from './campaigns/order-campaign/discount-campaign.module';
import { LoyaltyProgramModule } from './campaigns/loyalty-program/loyalty-program.module';
import { CampaignEntityModule } from './campaigns/campaigns.module';
import { CampaignsController } from './campaigns/order-campaign/disocunt-campaign.controller';
import { LoyaltyProgramController } from './campaigns/loyalty-program/loyalty-program.controller';
import { ShippingCampaignModule } from './campaigns/shipping_campaign/shipping_campaign.module';

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
     CampaignEntityModule,
    LoyaltyProgramModule,
    NotificationsModule,
    SegmentModule,
    PromotionModule,
    ShippingCampaignModule
  ],
  controllers: [
    AppController,
    CampaignsController,
        LoyaltyProgramController,
    NotificationsController,
    
    
  ],
  providers: [AppService, NotificationsService,],
})
export class AppModule {}
