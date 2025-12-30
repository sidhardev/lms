import { Controller, Post, Body, Get} from '@nestjs/common';
import { MailService } from './mail.service';
import { SendMailDto } from './dtos/send-mail.dto';
import { VerifyOtpDto } from './dtos/verify-otp.dto';

@Controller('mail')
export class MailController {

    constructor(private readonly mailService: MailService) {}

    @Post('/send-otp')
    async sendOtp(@Body() body: SendMailDto) {
        const { email } = body;
        if (!email) {
            return {
                status: false,
                message: 'Email is required',
            };
        }
        
        await this.mailService.sendOtp(email);
        return {
            status: true,
            message: 'OTP sent successfully',
        };
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

        const result = await this.mailService.verifyOtp(email, otp);
        return result;
    }


}
