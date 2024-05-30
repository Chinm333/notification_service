import { Body, Controller, Post } from '@nestjs/common';
import { EmailService } from './email/email.service';

@Controller('api/notification')
export class NotificationController {
    constructor(
        private readonly mailerService: EmailService, 
    ){}
    @Post()
    async sendEmail(@Body() body:any) {
        try {
            await this.mailerService.sendEmail(body.mail);
            return "Request sent";
        } catch (error) {
            console.log(body);
            
            return 'error'+error;
        }
    }
}
