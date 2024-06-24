import { MailerService } from '@nestjs-modules/mailer';
import { CACHE_MANAGER } from '@nestjs/cache-manager';
import { Inject, Injectable } from '@nestjs/common';

@Injectable()
export class AppService {
  constructor(
    @Inject(CACHE_MANAGER) private cacheManager,
    private readonly mailerService: MailerService,
  ) {}
  async getHello(): Promise<any> {
    await this.cacheManager.set('test', 'hello world', { ttl: 20 });
    await this.mailerService.sendMail({
      to: 'thangbvse160516@fpt.edu.vn',
      subject: 'Testing Nest MailerModule ✔',
      template: './email/otp',
      context: {
        otp: 123456,
      },
    });
    return 'Hello World!';
  }
}
