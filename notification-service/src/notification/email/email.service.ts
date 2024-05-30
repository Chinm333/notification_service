import { MailerService } from '@nestjs-modules/mailer';
import { Injectable } from '@nestjs/common';
import * as crypto from 'crypto';

@Injectable()
export class EmailService {
    constructor(
        private readonly mailerService: MailerService,
        
    ) { }

    async sendEmail(receiverEmail: string) {
        const otp: string = await this.generateOtp(6);
        const subject: string = `OTP for Pearl Thoughts Login`;
        const body: string = `
      Hey ${receiverEmail}!,
    
       Your One-Time Password (OTP) for login is: ${otp}.
        
       Please use this OTP to complete the login process. Do not share this OTP with anyone for security reasons.
        
      Thank you,
      Pearl Thoughts Team`;
        if (!otp) {
            return { body: "Please check your email and try again." };
        } else {
            await this.mailerService.sendMail({
                to: receiverEmail,
                subject,
                text: body,
            });
        }
    }
    async generateOtp(length?) {
        const digits = '0123456789';
        const bytes = crypto.randomBytes(Math.ceil(length));
        const otp = Array.from(bytes, byte => digits[byte % digits.length]);
        return otp.join('');
    }
}
