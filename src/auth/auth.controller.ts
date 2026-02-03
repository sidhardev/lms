import { Controller, UseGuards } from '@nestjs/common';
import { Post, Body, Get, Query } from '@nestjs/common';
import { UserSigninDto } from './dtos/user-signin.dto';
import { AuthService } from './auth.service';
import { ResetPasswordDto } from './dtos/reset-passsword.dto';
import { ForgetPasswordDto } from './dtos/forget-password.dto';
import { ApiOperation } from '@nestjs/swagger';

@Controller('auth')
export class AuthController {
  constructor(private readonly authService: AuthService) {}

  @Post('/signin')
  @ApiOperation({ summary: 'Sign in the user' })
  async signin(@Body() body: UserSigninDto) {
    const user = await this.authService.signin(body.email, body.password);
    return user;
  }
  @Post('/forget-password')
  @ApiOperation({ summary: 'Send password reset mail to user' })
  async forgetPassword(@Body() body: ForgetPasswordDto) {
    const result = await this.authService.forgetPassword(body.email);
    return result;
  }
  @Get('reset-password')
  @ApiOperation({ summary: 'Verify the reset password token of user' })
  verifyResetToken(
    @Query('token') token: string,
    @Query('email') email: string,
  ) {
    return this.authService.verifyResetToken(token, email);
  }
  @Post('reset-password')
  @ApiOperation({ summary: 'Reset user password' })
  async resetPassword(@Body() body: ResetPasswordDto) {
    const result = await this.authService.resetPassword(
      body.token,
      body.newPassword,
      body.email,
    );
    return result;
  }
}
