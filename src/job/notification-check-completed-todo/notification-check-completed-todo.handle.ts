import { ISendMailOptions, MailerService } from '@nestjs-modules/mailer';
import { Process, Processor } from '@nestjs/bull';
import { Logger } from '@nestjs/common';
import { Job } from 'bull';
import { PrismaService } from 'src/database/prisma/prisma.service';
import { MESSAGES_EN } from 'src/messages/messages-en';
import { eJob, eQueue } from '../job.config';

@Processor(eQueue.NOTIFICATION_CHECK_COMPLETED_TODO_QUEUE)
export class NotificationCheckCompletedTodoHandle {
  constructor(
    private readonly prismaService: PrismaService,
    private readonly mailerService: MailerService,
  ) {}

  @Process(eJob.NOTIFICATION_CHECK_COMPLETED_TODO_JOB)
  async executeJob(job: Job): Promise<void> {
    this.notificationCheckCompletedTodo(job);
  }

  private async notificationCheckCompletedTodo(job: Job): Promise<void> {
    Logger.log(`🔁 ${job.name} is running...`, 'Automatic Job');
    Logger.log(
      `email sent to ${await this.notificationCheckCompletedTodoByUser()} users`,
      'Automatic Job',
    );
  }

  private async notificationCheckCompletedTodoByUser(): Promise<number> {
    const users = await this.prismaService.user.findMany({
      orderBy: { userID: 'asc' },
    });

    if (users.length === 0) return users.length;

    const userAndTodos = users.map(async (user) => {
      const countTodo = await this.prismaService.todo.count({
        where: {
          userID: user.userID,
          completed: false,
        },
      });

      return {
        email: user.email,
        countTodo,
      };
    });

    const todoByUser = (await Promise.all(userAndTodos)).filter(
      (data) => data.countTodo > 0,
    );

    todoByUser.forEach(async (user) => {
      if (user.countTodo > 0) {
        await this.sendEmail(user.email);
      }
    });

    return todoByUser.length;
  }

  private async sendEmail(email: string) {
    await this.mailerService.sendMail({
      to: email,
      from: MESSAGES_EN.email.from,
      subject: MESSAGES_EN.email.subject.checkCompleteTodo,
      template: 'todos-peding',
      context: {
        uri: 'https://www.instagram.com/dev.brasil/',
      },
    } as ISendMailOptions);
  }
}
