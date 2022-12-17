import { MailerModule } from '@nestjs-modules/mailer';
import { Module } from '@nestjs/common';
import { mailerConfig } from 'src/mail/mailer.config';
import { PrismaModule } from '../database/prisma/prisma.module';
import { RecoverPasswordController } from './recover-password.controller';
import { RecoverPasswordService } from './recover-password.service';

@Module({
  imports: [MailerModule.forRoot(mailerConfig), PrismaModule],
  controllers: [RecoverPasswordController],
  providers: [RecoverPasswordService],
})
export class RecoverPasswordModule {}
