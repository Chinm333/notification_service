import { Module } from '@nestjs/common';
import { EmailService } from './email/email.service';
import { NotificationController } from './notification.controller';

@Module({
  providers: [EmailService],
  controllers: [NotificationController]
})
export class NotificationModule {}
