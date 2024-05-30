import { EmailService } from './email/email.service';
export declare class NotificationController {
    private readonly mailerService;
    constructor(mailerService: EmailService);
    sendEmail(body: any): Promise<string>;
}
