import { Body, Injectable } from '@nestjs/common';
import { JwtService } from '@nestjs/jwt';
import { UserService } from 'src/user/user.service';
import { scrypt as _scrypt, randomBytes } from 'crypto';
import { promisify } from 'util';
import { ResetPasswordDto } from './dtos/reset-passsword.dto';
import { MailService } from 'src/mail/mail.service';
import { identity } from 'rxjs';
import { BadRequestException } from '@nestjs/common';

const scrypt = promisify(_scrypt);

@Injectable()
export class AuthService {
  constructor(
    private userService: UserService,
    private jwtService: JwtService,
    private mailService: MailService,
  ) {}

  async signin(email: string, password: string) {
    const [user] = await this.userService.find(email);
    if (!user) {
      return {
        status: false,
        message: 'User not found',
      };
    }
    const [salt, storedHash] = user.password.split('.');
    const hash = (await scrypt(password, salt, 32)) as Buffer;
    if (storedHash !== hash.toString('hex')) {
      return {
        status: false,
        message: 'Invalid password',
      };
    }
    const payload = { sub: user.id, email: user.email, otpVerified: true };
    const token = await this.jwtService.signAsync(payload);
    return {
      status: true,
      message: 'Signin successful',
      token,
    };
  }

  async forgetPassword(email: string) {
    const user = await this.userService.findByEmail(email);
    if (!user) {
      return {
        status: false,
        message: 'User not found',
      };
    }
    user.resetPasswordToken = randomBytes(32).toString('hex');
    user.resetPasswordExpires = new Date(Date.now() + 15 * 60 * 1000);

    await this.userService.updateUser(user);
    await this.mailService.sendResetPasswordEmail(
      email,
      user.resetPasswordToken,
    );

    return {
      status: true,
      message: 'Password reset email sent',
    };
  }
  async verifyResetToken(token: string) {
    const user = await this.userService.findByToken({
      where: { resetPasswordToken: token },
    });
    if (!user) {
      throw new BadRequestException('Invalid or expired token');
    }

    if (
      !user ||
      !user.resetPasswordExpires ||
      user.resetPasswordExpires < new Date()
    ) {
      throw new BadRequestException('Invalid or expired token');
    }

    return { message: 'Token valid ✅', isValid: true };
  }
  async resetPassword(token: string, newPassword: string) {
    const user = await this.userService.findByToken({
      where: { resetPasswordToken: token },
    });
    if (
      !user ||
      !user.resetPasswordExpires ||
      user.resetPasswordExpires < new Date()
    ) {
      throw new BadRequestException('Invalid or expired token');
    }
    const salt = randomBytes(8).toString('hex');
    const hash = (await scrypt(newPassword, salt, 32)) as Buffer;
    user.password = salt + '.' + hash.toString('hex');
    user.resetPasswordToken = null;
    user.resetPasswordExpires = null;
    await this.userService.updateUser(user);
    return {
      status: true,
      message: 'Password reset successful',
    };
  }
}
