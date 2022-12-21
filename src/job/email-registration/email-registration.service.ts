import { InjectQueue } from '@nestjs/bull';
import { Injectable } from '@nestjs/common';
import { Queue } from 'bull';
import { eJob, eQueue } from '../job.config';
import { IEmailRegistration } from './email-registration.model';

@Injectable()
export class EmailRegistrationService {
  constructor(
    @InjectQueue(eQueue.EMAIL_REGISTRATION_QUEUE)
    private queue: Queue,
  ) {}

  async addQueueEmailRegistrationJob(
    userData: IEmailRegistration,
  ): Promise<void> {
    await this.queue.add(eJob.EMAIL_REGISTRATION_JOB, userData);
  }
}
