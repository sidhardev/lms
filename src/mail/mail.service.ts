import { Injectable } from '@nestjs/common';
import * as nodemailer from 'nodemailer';
import SMTPTransport from 'nodemailer/lib/smtp-transport';
import * as dotenv from 'dotenv';
import { JwtService } from '@nestjs/jwt';
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

  async sendOtp(email: string) {
    const otp = Math.floor(100000 + Math.random() * 900000);
    this.storeOTP.set(email, otp);
    setTimeout(() => this.storeOTP.delete(email), 5 * 60 * 1000);

    await this.transporter.sendMail({
      from: `"OTP Service" <${process.env.MAIL_USER}>`,
      to: email,
      subject: 'OTP Verification',
      html: `<!DOCTYPE html>
<html lang="en">
<head>
<meta charset="UTF-8" />
<title>Verify It's You</title>
<style>
  body {
    margin: 0;
    padding: 0;
    background: radial-gradient(circle at top, #111827, #030712);
    font-family: 'Segoe UI', Helvetica, Arial, sans-serif;
  }

  .wrapper {
    width: 100%;
    padding: 60px 0;
  }

  .card {
    max-width: 480px;
    margin: auto;
    background: linear-gradient(180deg, #ffffff, #f1f5f9);
    border-radius: 26px;
    padding: 40px 34px;
    text-align: center;
    box-shadow:
      0 40px 90px rgba(0, 0, 0, 0.6),
      inset 0 0 0 1px rgba(255, 255, 255, 0.8);
    animation: floatUp 1s ease;
  }

  @keyframes floatUp {
    from {
      opacity: 0;
      transform: translateY(40px) scale(0.96);
    }
    to {
      opacity: 1;
      transform: translateY(0) scale(1);
    }
  }

  .halo {
    width: 86px;
    height: 86px;
    margin: auto;
    border-radius: 50%;
    background: radial-gradient(circle, rgba(255, 215, 128, 0.9), rgba(255, 215, 128, 0.1));
    display: flex;
    align-items: center;
    justify-content: center;
    animation: aura 2.4s infinite;
    margin-bottom: 22px;
  }

  @keyframes aura {
    0% { box-shadow: 0 0 0 0 rgba(255, 215, 128, 0.6); }
    70% { box-shadow: 0 0 0 18px rgba(255, 215, 128, 0); }
    100% { box-shadow: 0 0 0 0 rgba(255, 215, 128, 0); }
  }

  .shield {
    width: 58px;
    height: 58px;
    border-radius: 50%;
    background: linear-gradient(135deg, #facc15, #fde68a);
    display: flex;
    align-items: center;
    justify-content: center;
    font-size: 30px;
    box-shadow: 0 8px 22px rgba(250, 204, 21, 0.8);
  }

  h1 {
    font-size: 26px;
    color: #0f172a;
    margin-bottom: 10px;
    letter-spacing: 0.5px;
  }

  .subtitle {
    font-size: 15px;
    color: #475569;
    margin-bottom: 30px;
  }

  .otp {
    display: inline-block;
    padding: 22px 30px;
    border-radius: 16px;
    background: linear-gradient(270deg, #111827, #1f2937, #111827);
    background-size: 400% 400%;
    color: #facc15;
    font-size: 38px;
    letter-spacing: 12px;
    font-weight: 700;
    box-shadow:
      inset 0 0 0 1px rgba(250, 204, 21, 0.4),
      0 18px 40px rgba(15, 23, 42, 0.6);
    animation: gradientFlow 3s ease infinite;
  }

  @keyframes gradientFlow {
    0% { background-position: 0% 50%; }
    50% { background-position: 100% 50%; }
    100% { background-position: 0% 50%; }
  }

  .expiry {
    margin-top: 18px;
    font-size: 14px;
    color: #64748b;
  }

  .divider {
    width: 90%;
    height: 1px;
    background: linear-gradient(to right, transparent, #e5e7eb, transparent);
    margin: 34px auto;
  }

  .info {
    font-size: 14px;
    color: #475569;
    line-height: 1.7;
  }

  .warning {
    margin-top: 16px;
    font-size: 13px;
    color: #92400e;
  }

  .footer {
    margin-top: 34px;
    font-size: 12px;
    color: #94a3b8;
  }

  .footer strong {
    color: #facc15;
  }
</style>
</head>

<body>
  <div class="wrapper">
    <div class="card">

      <div class="halo">
        <div class="shield">🛡️</div>
      </div>

      <h1>Verify It’s You</h1>
      <div class="subtitle">
        We noticed a password reset attempt and want to make sure it’s really you
      </div>

      <div class="otp">
        ${otp}
      </div>

      <div class="expiry">
        ⏳ Code valid for <strong>5 minutes</strong>
      </div>

      <div class="divider"></div>

      <div class="info">
        Enter this verification code to continue.
        This extra step keeps your account and rewards safe.
      </div>

      <div class="warning">
        ⚠️ Didn’t request this? Secure your account immediately.
      </div>

      <div class="footer">
        © 2025 <strong>Your Secure Platform</strong><br />
        Trusted Access • Intelligent Security
      </div>

    </div>
  </div>
</body>
</html>


`,
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
    return this.transporter.sendMail({
      from: `"Password Reset" <${process.env.MAIL_USER}>`,
      to: email,
      subject: 'Password Reset Request',
      html: `<p>You requested a password reset. Click the link below to reset your password:</p>
             <a href="${resetLink}">Reset Password</a>
             <p>This link will expire in 15 minutes.</p>`,
    });
  }

  isOtpVerified(email: string): boolean {
    return this.verifiedEmails.has(email);
  }
}
