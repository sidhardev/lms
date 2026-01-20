import { Module } from '@nestjs/common';
import { TypeOrmModule } from '@nestjs/typeorm';
import { CampaignNotification } from './entities/notification.entity';

@Module({
  imports: [TypeOrmModule.forFeature([CampaignNotification])],
})
export class NotificationsModule {}
