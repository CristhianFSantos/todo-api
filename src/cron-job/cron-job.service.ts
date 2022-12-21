import { Injectable } from '@nestjs/common';
import { Cron } from '@nestjs/schedule';
import { NotificationCheckCompletedTodoService } from 'src/job/notification-check-completed-todo/notification-check-completed-todo.service';

@Injectable()
export class CronJobService {
  constructor(
    private notificationCheckCompletedTodoService: NotificationCheckCompletedTodoService,
  ) {}

  // CronJob que executa rodos os dias as 8:00 AM
  @Cron('0 8 * * *', {
    name: 'check-completed-todos',
  })
  handleCron() {
    this.notificationCheckCompletedTodoService.addQueueNotificationCheckCompletedTodoServiceJob();
  }
}
