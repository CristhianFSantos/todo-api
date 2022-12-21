import { ISendMailOptions, MailerService } from '@nestjs-modules/mailer';
import {
  OnQueueActive,
  OnQueueCompleted,
  Process,
  Processor,
} from '@nestjs/bull';
import { Logger } from '@nestjs/common';
import { Job } from 'bull';
import { eJob, eQueue } from '../job.config';
import { IEmailRecoverPassword } from './email-revocer-passaword.model';

@Processor(eQueue.RECOVER_PASSWORD_QUEUE)
export class EmailRecoverPasswordHandle {
  constructor(private mailerService: MailerService) {}

  @Process(eJob.RECOVER_PASSWORD_JOB)
  async executeJob(job: Job): Promise<void> {
    const dataRecover: IEmailRecoverPassword = job.data;
    await this.sendEmail(dataRecover);
  }

  private async sendEmail(dataUser: IEmailRecoverPassword): Promise<void> {
    const { email, code } = dataUser;
    await this.mailerService.sendMail({
      to: email,
      from: '🚀 Todo App 🚀 <nestjs.mail.api@gmail.com>',
      subject: `Você solicitou uma recuperação de senha!`,
      template: 'recover-password',
      context: {
        uri: 'https://www.instagram.com/dev.brasil/',
        code: code,
      },
    } as ISendMailOptions);
  }

  @OnQueueActive()
  onActive(job: Job) {
    Logger.log(`${job.name} is processing...`, 'Job processing');
  }

  @OnQueueCompleted()
  onCompleted(job: Job) {
    Logger.log(
      `${job.name} completed in ${job.finishedOn - job.processedOn} ms `,
      'Job completed',
    );
  }
}
