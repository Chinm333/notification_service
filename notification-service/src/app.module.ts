import { Module } from '@nestjs/common';
import { AppController } from './app.controller';
import { AppService } from './app.service';
import { NotificationModule } from './notification/notification.module';
import { MailerModule } from '@nestjs-modules/mailer';
import { HandlebarsAdapter } from '@nestjs-modules/mailer/dist/adapters/handlebars.adapter';
import * as dotenv from 'dotenv';

dotenv.config();

@Module({
  imports: [
    NotificationModule,
    MailerModule.forRoot({
      transport: {
        host: process.env.SMTP_HOST,
        port: Number(process.env.SMTP_PORT),
        secure: false,
        auth: {
          user: process.env.SMTP_USER,
          pass: process.env.SMTP_PASSWORD,
        },
        defaults: {
          from: `"No Reply" <no-reply@${process.env.SMTP_HOST}>`,
        },
        preview: true,
        template: {
          dir: process.cwd() + '/template/',
          adapter: new HandlebarsAdapter(),
          options: {
            strict: true,
          },
        },
      },
    }),
    MailerModule.forRoot({
      transport: {
        host: process.env.BACKUP_SMTP_HOST,
        port: Number(process.env.BACKUP_SMTP_PORT),
        secure: false,
        auth: {
          user: process.env.BACKUP_SMTP_USER,
          pass: process.env.BACKUP_SMTP_PASSWORD,
        },
        defaults: {
          from: `"No Reply" <no-reply@${process.env.BACKUP_SMTP_HOST}>`,
        },
        preview: true,
        template: {
          dir: process.cwd() + '/template/',
          adapter: new HandlebarsAdapter(),
          options: {
            strict: true,
          },
        },
      },
    }),
  ],
  controllers: [AppController],
  providers: [AppService],
})
export class AppModule { }
