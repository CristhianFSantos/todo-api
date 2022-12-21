import { MailerOptions, MailerOptionsFactory } from '@nestjs-modules/mailer';
import { HandlebarsAdapter } from '@nestjs-modules/mailer/dist/adapters/handlebars.adapter';
import * as path from 'path';

export class MailerConfig implements MailerOptionsFactory {
  private readonly pathTemplate = '../../src/mail/templates';
  createMailerOptions(): MailerOptions | Promise<MailerOptions> {
    return {
      transport: process.env.EMAIL_CREDENTIALS_SMTP,
      template: {
        dir: path.resolve(__dirname, this.pathTemplate),
        adapter: new HandlebarsAdapter(),
        options: {
          extName: '.hbs',
          layoutsDir: path.resolve(__dirname, this.pathTemplate),
        },
      },
    };
  }
}
