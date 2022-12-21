import { MailerModule } from '@nestjs-modules/mailer';
import { BullModule } from '@nestjs/bull';
import { Module } from '@nestjs/common';
import 'dotenv/config';
import { MailerConfig } from 'src/mail/mailer.config';
import { EmailRecoverPasswordHandle } from './email-recover-password/email-revocer-passaword.handle';
import { EmailRecoverPasswordService } from './email-recover-password/email-revocer-passaword.service';
import { EmailRegistrationHandle } from './email-registration/email-registration.handle';
import { EmailRegistrationService } from './email-registration/email-registration.service';
import { JOB_CONFIG } from './job.config';

@Module({
  imports: [
    BullModule.forRoot(JOB_CONFIG.config_redis),
    BullModule.registerQueue(...JOB_CONFIG.list_queues),

    MailerModule.forRootAsync({
      useClass: MailerConfig,
    }),
  ],
  providers: [
    EmailRegistrationService,
    EmailRegistrationHandle,

    EmailRecoverPasswordService,
    EmailRecoverPasswordHandle,
  ],
  exports: [EmailRegistrationService, EmailRecoverPasswordService],
})
export class JobModule {}
