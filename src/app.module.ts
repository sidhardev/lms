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
import { AdminController } from './coupons/admin/admin-coupon.controller';
import { AdminModule } from './coupons/admin/admin-coupon.module';

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
      entities: [User, Coupon],
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
    AuthModule, MailModule, CouponsModule, AdminModule,   
  ],
  controllers: [AppController, AdminController,],
  providers: [AppService],
})
export class AppModule {}
