import { InjectQueue } from '@nestjs/bull';
import { Injectable } from '@nestjs/common';
import { Queue } from 'bull';
import { eJob, eQueue } from '../job.config';

@Injectable()
export class NotificationCheckCompletedTodoService {
  constructor(
    @InjectQueue(eQueue.NOTIFICATION_CHECK_COMPLETED_TODO_QUEUE)
    private queue: Queue,
  ) {}

  async addQueueNotificationCheckCompletedTodoServiceJob(): Promise<void> {
    await this.queue.add(eJob.NOTIFICATION_CHECK_COMPLETED_TODO_JOB);
  }
}
