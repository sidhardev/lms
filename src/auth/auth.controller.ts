import { Controller } from '@nestjs/common';
import { Post, Body,Get, Query } from '@nestjs/common';
import { UserSigninDto } from './dtos/user-signin.dto';
import { AuthService } from './auth.service';
import { ResetPasswordDto } from './dtos/reset-passsword.dto';
import { ForgetPasswordDto } from './dtos/forget-password.dto';

@Controller('auth')
export class AuthController {
    constructor(private readonly authService: AuthService) {}

    @Post('/signin')
   
    async signin(@Body() body: UserSigninDto) {
        const user = await this.authService.signin(body.email, body.password);
        return user;
    }
    
  @Post('/forget-password')
  async forgetPassword(@Body() body: ForgetPasswordDto) {
    const result = await this.authService.forgetPassword(body.email);
    return result;
  }

  @Get('reset-password')
  verifyResetToken(@Query('token') token: string) {
    return this.authService.verifyResetToken(token);
  }
  @Post('reset-password')
  async resetPassword(@Body() body: ResetPasswordDto) {
    const result = await this.authService.resetPassword(
      body.token,
      body.newPassword,
    );
    return result;
  }

}
