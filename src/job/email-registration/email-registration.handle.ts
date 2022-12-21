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
import { IEmailRegistration } from './email-registration.model';

@Processor(eQueue.EMAIL_REGISTRATION_QUEUE)
export class EmailRegistrationHandle {
  constructor(private mailerService: MailerService) {}

  @Process(eJob.EMAIL_REGISTRATION_JOB)
  async executeJob(job: Job): Promise<void> {
    const dataUser: IEmailRegistration = job.data;
    await this.sendEmail(dataUser);
  }

  private async sendEmail(dataUser: IEmailRegistration): Promise<void> {
    await this.mailerService.sendMail({
      to: dataUser.email,
      from: '🚀 Todo App 🚀 <nestjs.mail.api@gmail.com>',
      subject: `Cadastro realizado com sucesso! Seja bem vindo ${dataUser.name}!`,
      template: 'email-registration',
      context: {
        uri: 'https://www.instagram.com/dev.brasil/',
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
