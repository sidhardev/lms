import { Controller, Req } from '@nestjs/common';
import { Post, Body } from '@nestjs/common';
import { CreateUserDto } from './dtos/create-user.dto';
import { UserService } from './user.service';
import { ApiBearerAuth } from '@nestjs/swagger';
import { UseGuards } from '@nestjs/common';
import { VerifyOtpDto } from 'src/mail/dtos/verify-otp.dto';
import { SendMailDto } from 'src/mail/dtos/send-mail.dto';
import { JwtAuthGuard } from 'src/auth/guards/jwt-auth.guard';
import { UnauthorizedException } from '@nestjs/common';

@Controller('user')
export class UserController {
  constructor(private readonly userService: UserService) {}

  @Post('/send-otp')
  async sendOtp(@Body() body: SendMailDto) {
    const user = await this.userService.sendOtp(body.email);
    return user;
  }
  @Post('/verify-otp')
  async verifyOtp(@Body() body: VerifyOtpDto) {
    const { email, otp } = body;
    if (!email || !otp) {
      return {
        status: false,
        message: 'Email and OTP are required',
      };
    }

    const result = await this.userService.verifyOtp(email, otp);
    if (!result.status) {
      return {
        status: false,
        message: 'Invalid OTP!',
      };
    }

    return {
      status: true,
      message: 'OTP verified successfully',
      access_token: result.token,
    };
  }

  @ApiBearerAuth('access-token')
  @UseGuards(JwtAuthGuard)
  @Post('/signup')
  async createUser(@Body() createUserDto: CreateUserDto, @Req() req: any) {
    const otpVerified: boolean = req.user?.otpVerified;
    if (!otpVerified) {
      throw new UnauthorizedException('OTP not verified');
    }
    const user = await this.userService.create(createUserDto, req);
    return user;
  }
}
