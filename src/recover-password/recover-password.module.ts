import { MailerModule } from '@nestjs-modules/mailer';
import { Module } from '@nestjs/common';
import { JobModule } from 'src/job/job.module';
import { MailerConfig } from 'src/mail/mailer.config';
import { PrismaModule } from '../database/prisma/prisma.module';
import { RecoverPasswordController } from './recover-password.controller';
import { RecoverPasswordService } from './recover-password.service';

@Module({
  imports: [
    MailerModule.forRootAsync({
      useClass: MailerConfig,
    }),
    PrismaModule,
    JobModule,
  ],
  controllers: [RecoverPasswordController],
  providers: [RecoverPasswordService],
})
export class RecoverPasswordModule {}
