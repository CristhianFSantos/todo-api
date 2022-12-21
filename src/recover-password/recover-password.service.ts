import { HttpException, HttpStatus, Injectable } from '@nestjs/common';
import * as argon from 'argon2';
import { PrismaService } from 'src/database/prisma/prisma.service';
import { EmailRecoverPasswordService } from 'src/job/email-recover-password/email-revocer-passaword.service';
import { MESSAGES_EN } from 'src/messages/messages-en';
import { RecoverPasswordRequestDTO } from './dto/recover-password.request.dto';
import { RecoverPasswordResponseDTO } from './dto/recover-password.response.dto';

@Injectable()
export class RecoverPasswordService {
  constructor(
    private readonly prismaService: PrismaService,
    private readonly emailRecoverPasswordService: EmailRecoverPasswordService,
  ) {}

  async recoverPassword(email: string): Promise<string> {
    try {
      const code = this.generateRandomCode();

      await this.prismaService.user.update({
        where: { email: email },
        data: {
          recoveryCode: code,
        },
      });

      await this.emailRecoverPasswordService.addQueueEmailRecoverPasswordJob({
        email,
        code: code.toString(),
      });

      return MESSAGES_EN.success.emailSentSuccessfully;
    } catch (error) {
      throw new HttpException(error.message, HttpStatus.BAD_REQUEST);
    }
  }

  private generateRandomCode(): number {
    return Number.parseInt(Math.random().toString().slice(2, 8));
  }

  async checkRecoveryCodeAndUpdatePassword(
    recoverData: RecoverPasswordRequestDTO,
  ): Promise<RecoverPasswordResponseDTO> {
    try {
      const { email, code, newPassword } = recoverData;

      const user = await this.prismaService.user.findUnique({
        where: { email: email },
      });

      if (!user || user.recoveryCode != Number.parseInt(code))
        throw new HttpException(
          MESSAGES_EN.error.incorretCode,
          HttpStatus.BAD_REQUEST,
        );

      const password = await argon.hash(newPassword);

      await this.prismaService.user.update({
        where: { email: email },
        data: {
          password,
          recoveryCode: 0,
        },
      });

      return new RecoverPasswordResponseDTO(user);
    } catch (error) {
      throw new HttpException(error.message, HttpStatus.BAD_REQUEST);
    }
  }
}
