import { MailerService } from '@nestjs-modules/mailer';
import { Injectable, Logger } from '@nestjs/common';
import * as crypto from 'crypto';

@Injectable()
export class EmailService {
    private readonly maxRetries = 3;
    private readonly logger = new Logger(EmailService.name);

    constructor(
        private readonly primaryMailerService: MailerService, 
        private readonly backupMailerService: MailerService,
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
            let attempt = 0;
            let success = false;

            while (attempt < this.maxRetries && !success) {
                try {
                    attempt++;
                    await this.primaryMailerService.sendMail({
                        to: receiverEmail,
                        subject,
                        text: body,
                    });
                    success = true;
                    this.logger.log('Email sent successfully via primary service.');
                } catch (error) {
                    this.logger.error(`Attempt ${attempt} failed: ${error.message}`);

                    if (attempt >= this.maxRetries) {
                        this.logger.warn('Switching to backup email service...');
                        try {
                            await this.backupMailerService.sendMail({
                                to: receiverEmail,
                                subject,
                                text: body,
                            });
                            success = true;
                            this.logger.log('Email sent successfully via backup service.');
                        } catch (backupError) {
                            this.logger.error('Backup service failed: ' + backupError.message);
                            throw new Error('All email sending attempts failed.');
                        }
                    }
                }
            }
        }
    }

    async generateOtp(length?) {
        const digits = '0123456789';
        const bytes = crypto.randomBytes(Math.ceil(length));
        const otp = Array.from(bytes, (byte) => digits[byte % digits.length]);
        return otp.join('');
    }
}
