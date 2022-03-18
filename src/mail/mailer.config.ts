import { MailerOptions } from '@nestjs-modules/mailer';
import { HandlebarsAdapter } from '@nestjs-modules/mailer/dist/adapters/handlebars.adapter';
import * as path from 'path';

export const mailerConfig: MailerOptions = {
  // remetente
  transport: `smtps://nestjs.mail.api@gmail.com:12345678Qq!@smtp.gmail.com`,
  template: {
    dir: path.resolve(__dirname, '..', '..', 'src', 'mail', 'templates'),
    adapter: new HandlebarsAdapter(),
    options: {
      extName: '.hbs',
      layoutsDir: path.resolve(
        __dirname,
        '..',
        '..',
        'src',
        'mail',
        'templates',
      ),
    },
  },
};
