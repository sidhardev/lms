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
import { RewardsService } from './rewards/rewards.service';
import { RewardsModule } from './rewards/rewards.module';
import { Wallet } from './rewards/wallet.entity';


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
      entities: [User, Coupon, CouponRedemption, Wallet],
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
    RewardsModule,
  ],
  controllers: [AppController],
  providers: [AppService],
})
export class AppModule {}
