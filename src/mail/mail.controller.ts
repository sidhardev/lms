import { Controller, Post, Body, Get} from '@nestjs/common';
import { MailService } from './mail.service';
import { SendMailDto } from './dtos/send-mail.dto';

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
        
        const otp = Math.floor(100000 + Math.random() * 900000);
        await this.mailService.sendOtp(email, otp.toString());
        return {
            status: true,
            message: 'OTP sent successfully',
        };
    }


}
