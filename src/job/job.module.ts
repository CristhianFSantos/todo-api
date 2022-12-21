import { MailerModule } from '@nestjs-modules/mailer';
import { BullModule } from '@nestjs/bull';
import { Module } from '@nestjs/common';
import 'dotenv/config';
import { CronJobService } from 'src/cron-job/cron-job.service';
import { PrismaModule } from 'src/database/prisma/prisma.module';
import { MailerConfig } from 'src/mail/mailer.config';
import { EmailRecoverPasswordHandle } from './email-recover-password/email-revocer-passaword.handle';
import { EmailRecoverPasswordService } from './email-recover-password/email-revocer-passaword.service';
import { EmailRegistrationHandle } from './email-registration/email-registration.handle';
import { EmailRegistrationService } from './email-registration/email-registration.service';
import { JOB_CONFIG } from './job.config';
import { NotificationCheckCompletedTodoHandle } from './notification-check-completed-todo/notification-check-completed-todo.handle';
import { NotificationCheckCompletedTodoService } from './notification-check-completed-todo/notification-check-completed-todo.service';

@Module({
  imports: [
    BullModule.forRoot(JOB_CONFIG.config_redis),
    BullModule.registerQueue(...JOB_CONFIG.list_queues),

    MailerModule.forRootAsync({
      useClass: MailerConfig,
    }),
    PrismaModule,
  ],
  providers: [
    EmailRegistrationService,
    EmailRegistrationHandle,

    EmailRecoverPasswordService,
    EmailRecoverPasswordHandle,

    NotificationCheckCompletedTodoService,
    NotificationCheckCompletedTodoHandle,

    CronJobService,
  ],
  exports: [
    EmailRegistrationService,
    EmailRecoverPasswordService,
    NotificationCheckCompletedTodoService,
  ],
})
export class JobModule {}
