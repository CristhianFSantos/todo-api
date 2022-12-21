import { InjectQueue } from '@nestjs/bull';
import { Injectable } from '@nestjs/common';
import { Queue } from 'bull';
import { eJob, eQueue } from '../job.config';
import { IEmailRecoverPassword } from './email-revocer-passaword.model';

@Injectable()
export class EmailRecoverPasswordService {
  constructor(
    @InjectQueue(eQueue.RECOVER_PASSWORD_QUEUE)
    private queue: Queue,
  ) {}

  async addQueueEmailRecoverPasswordJob(
    recoverData: IEmailRecoverPassword,
  ): Promise<void> {
    await this.queue.add(eJob.RECOVER_PASSWORD_JOB, recoverData);
  }
}
