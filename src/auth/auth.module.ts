import { Module } from '@nestjs/common';
import { JwtModule } from '@nestjs/jwt';
import { JobModule } from 'src/job/job.module';
import { PrismaModule } from '../database/prisma/prisma.module';
import { AuthController } from './auth.controller';
import { AuthService } from './auth.service';
import { JwtStrategy } from './strategies/jwt.strategy';

@Module({
  imports: [PrismaModule, JobModule, JwtModule.register({})],
  providers: [AuthService, JwtStrategy],
  controllers: [AuthController],
})
export class AuthModule {}
