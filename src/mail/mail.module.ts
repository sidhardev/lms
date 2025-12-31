import { Module } from '@nestjs/common';
import { MailController } from './mail.controller';
import { MailService } from './mail.service';
import { JwtModule } from '@nestjs/jwt';

@Module({
  controllers: [MailController],
  providers: [MailService],
  exports: [MailService],
  imports: [JwtModule],
})
export class MailModule {}
