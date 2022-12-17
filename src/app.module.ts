import { Module } from '@nestjs/common';
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
  ],
})
export class AppModule {}
