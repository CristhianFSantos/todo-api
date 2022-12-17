import { MailerOptions } from '@nestjs-modules/mailer';
import { HandlebarsAdapter } from '@nestjs-modules/mailer/dist/adapters/handlebars.adapter';
import * as path from 'path';

const pathTemplate = '../../src/mail/templates';
export const mailerConfig: MailerOptions = {
  transport: process.env.EMAIL_CREDENTIALS_SMTP.toString(),
  template: {
    dir: path.resolve(__dirname, pathTemplate),
    adapter: new HandlebarsAdapter(),
    options: {
      extName: '.hbs',
      layoutsDir: path.resolve(__dirname, pathTemplate),
    },
  },
};
