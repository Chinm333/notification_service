"use strict";
var __decorate = (this && this.__decorate) || function (decorators, target, key, desc) {
    var c = arguments.length, r = c < 3 ? target : desc === null ? desc = Object.getOwnPropertyDescriptor(target, key) : desc, d;
    if (typeof Reflect === "object" && typeof Reflect.decorate === "function") r = Reflect.decorate(decorators, target, key, desc);
    else for (var i = decorators.length - 1; i >= 0; i--) if (d = decorators[i]) r = (c < 3 ? d(r) : c > 3 ? d(target, key, r) : d(target, key)) || r;
    return c > 3 && r && Object.defineProperty(target, key, r), r;
};
var __metadata = (this && this.__metadata) || function (k, v) {
    if (typeof Reflect === "object" && typeof Reflect.metadata === "function") return Reflect.metadata(k, v);
};
Object.defineProperty(exports, "__esModule", { value: true });
exports.EmailService = void 0;
const mailer_1 = require("@nestjs-modules/mailer");
const common_1 = require("@nestjs/common");
const crypto = require("crypto");
let EmailService = class EmailService {
    constructor(mailerService) {
        this.mailerService = mailerService;
    }
    async sendEmail(receiverEmail) {
        const otp = await this.generateOtp(6);
        const subject = `OTP for Pearl Thoughts Login`;
        const body = `
      Hey ${receiverEmail}!,
    
       Your One-Time Password (OTP) for login is: ${otp}.
        
       Please use this OTP to complete the login process. Do not share this OTP with anyone for security reasons.
        
      Thank you,
      Pearl Thoughts Team`;
        if (!otp) {
            return { body: "Please check your email and try again." };
        }
        else {
            await this.mailerService.sendMail({
                to: receiverEmail,
                subject,
                text: body,
            });
        }
    }
    async generateOtp(length) {
        const digits = '0123456789';
        const bytes = crypto.randomBytes(Math.ceil(length));
        const otp = Array.from(bytes, byte => digits[byte % digits.length]);
        return otp.join('');
    }
};
exports.EmailService = EmailService;
exports.EmailService = EmailService = __decorate([
    (0, common_1.Injectable)(),
    __metadata("design:paramtypes", [mailer_1.MailerService])
], EmailService);
//# sourceMappingURL=email.service.js.map