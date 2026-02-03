import { Injectable } from '@nestjs/common';
import * as nodemailer from 'nodemailer';
import SMTPTransport from 'nodemailer/lib/smtp-transport';
import * as dotenv from 'dotenv';
import { JwtService } from '@nestjs/jwt';
import * as fs from 'fs';
import * as path from 'path';

dotenv.config();

@Injectable()
export class MailService {
  private transporter: nodemailer.Transporter<SMTPTransport.SentMessageInfo>;

  constructor(private jwtService: JwtService) {
    this.transporter = nodemailer.createTransport(
      new SMTPTransport({
        host: process.env.MAIL_HOST,
        port: Number(process.env.MAIL_PORT),
        secure: false,
        auth: {
          user: process.env.MAIL_USER,
          pass: process.env.MAIL_PASS,
        },
      }),
    );
  }

  private storeOTP = new Map<string, number>();
  private verifiedEmails = new Set<string>();
private loadTemplate(templateName: string, valiables: Record<string, string>) {
  const templatePath = path.join(
    process.cwd(),
    'src/mail/templates',
    templateName,
  );
  let html = fs.readFileSync(templatePath, 'utf-8');
  for(const key in valiables) {
    html = html.replace(
      new RegExp(`{{${key}}}`, 'g'),
      valiables[key],
    );
  }
  return html
}
  async sendOtp(email: string,) {
    const otp = Math.floor(100000 + Math.random() * 900000);
    this.storeOTP.set(email, otp);
    setTimeout(() => this.storeOTP.delete(email), 5 * 60 * 1000);
  
    const html = this.loadTemplate('verify-user.html', {
    OTP: otp.toString(),
  });


    await this.transporter.sendMail({
      from: `"OTP Service" <${process.env.MAIL_USER}>`,
      to: email,
      subject: 'OTP Verification',
      html,
    });
  }
  async verifyOtp(email: string, otp: number) {
    const storedOtp = this.storeOTP.get(email);

    if (!storedOtp) {
      return {
        status: false,
        message: 'OTP not found',
      };
    }

    if (storedOtp !== otp) {
      return {
        status: false,
        message: 'Invalid OTP!',
      };
    }

    const payload = { email, otpVerified: true };
    const token = await this.jwtService.signAsync(payload);
    this.verifiedEmails.add(email);

    return {
      status: true,
      message: 'OTP verified successfully',
      token,
    };
  }

  sendResetPasswordEmail(email: string, token: string) {
    const resetLink = `http://localhost:3000/auth/reset-password?token=${token}&email=${email}`;
    const html = this.loadTemplate('reset-password.html', {
    RESET_LINK: resetLink.toString(),
  });
    return this.transporter.sendMail({
      from: `"Password Reset" <${process.env.MAIL_USER}>`,
      to: email,
      subject: 'Password Reset Request',
      html
    });
  }

  isOtpVerified(email: string): boolean {
    return this.verifiedEmails.has(email);
  }
}
