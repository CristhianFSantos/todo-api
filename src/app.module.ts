import { Module } from '@nestjs/common';
import { ScheduleModule } from '@nestjs/schedule';
import { CronJobService } from 'src/cron-job/cron-job.service';
import { JobModule } from 'src/job/job.module';
import { AuthModule } from './auth/auth.module';
import { PrismaModule } from './database/prisma/prisma.module';
import { RecoverPasswordModule } from './recover-password/recover-password.module';
import { TodoModule } from './todo/todo.module';
import { UserModule } from './user/user.module';

@Module({
  imports: [
    AuthModule,
    PrismaModule,
    TodoModule,
    UserModule,
    RecoverPasswordModule,
    ScheduleModule.forRoot(),
    JobModule,
  ],
  providers: [CronJobService],
})
export class AppModule {}
