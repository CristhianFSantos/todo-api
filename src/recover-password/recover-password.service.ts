import { ISendMailOptions, MailerService } from '@nestjs-modules/mailer';
import { HttpException, HttpStatus, Injectable } from '@nestjs/common';
import * as argon from 'argon2';
import { PrismaService } from 'src/prisma/prisma.service';
import { eRecoverPasswordMessage } from 'src/shared/messages.enum';
import { RecoverPasswordRequestDTO } from './dtos/recover-password.response.dto';

@Injectable()
export class RecoverPasswordService {
  constructor(
    private mailerService: MailerService,
    private readonly prismaService: PrismaService,
  ) {}

  async recoverPassword(recoveryEmail: string): Promise<void> {
    const code = this.generateRandomCode();

    const mail: ISendMailOptions = {
      to: recoveryEmail,
      from: 'nestjs.mail.api@gmail.com',
      subject: 'Email de recuperação de senha',
      template: 'recover-password',
      context: {
        uri: 'https://www.instagram.com/dev.brasil/',
        code: code,
      },
    };

    await this.prismaService.user.update({
      where: { email: recoveryEmail },
      data: {
        recoveryCode: code,
      },
    });

    await this.mailerService.sendMail(mail);
  }

  private generateRandomCode(): number {
    let randomCode = '';
    for (let count = 0; count < 6; count++) {
      randomCode += Math.floor(Math.random() * 10);
    }
    return Number.parseInt(randomCode);
  }

  async checkRecoveryCodeAndUpdatePassword(
    recoveryCode: string,
    email: string,
    newPassword: string,
  ): Promise<RecoverPasswordRequestDTO> {
    const user = await this.prismaService.user.findUnique({
      where: { email: email },
    });

    if (user.recoveryCode != Number.parseInt(recoveryCode))
      throw new HttpException(
        eRecoverPasswordMessage.INCORRECT_CODE,
        HttpStatus.BAD_REQUEST,
      );
    const passwordHash = await argon.hash(newPassword);

    await this.prismaService.user.update({
      where: { email: email },
      data: {
        recoveryCode: 0,
        password: passwordHash,
      },
    });

    const response = new RecoverPasswordRequestDTO();
    response.userId = user.userID;
    response.email = user.email;
    response.message = eRecoverPasswordMessage.RECOVER_SUCCESS;
    response.httpStatus = HttpStatus.OK;

    return response;
  }
}
