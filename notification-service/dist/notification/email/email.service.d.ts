import { MailerService } from '@nestjs-modules/mailer';
export declare class EmailService {
    private readonly primaryMailerService;
    private readonly backupMailerService;
    private readonly maxRetries;
    private readonly logger;
    constructor(primaryMailerService: MailerService, backupMailerService: MailerService);
    sendEmail(receiverEmail: string): Promise<{
        body: string;
    }>;
    generateOtp(length?: any): Promise<string>;
}
