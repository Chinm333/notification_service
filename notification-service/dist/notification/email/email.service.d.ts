import { MailerService } from '@nestjs-modules/mailer';
export declare class EmailService {
    private readonly mailerService;
    constructor(mailerService: MailerService);
    sendEmail(receiverEmail: string): Promise<{
        body: string;
    }>;
    generateOtp(length?: any): Promise<string>;
}
