import {
  Controller,
  HttpException,
  HttpStatus,
  Post,
  Query,
} from '@nestjs/common';
import { ApiQuery, ApiTags } from '@nestjs/swagger';
import { eRecoverPasswordMessage } from 'src/shared/messages.enum';
import { RecoverPasswordService } from './recover-password.service';

@ApiTags('Recover Password')
@Controller('recover-password')
export class RecoverPasswordController {
  constructor(private recoverPasswordService: RecoverPasswordService) {}

  @Post('send-email')
  @ApiQuery({ name: 'email', required: true })
  async recoverPassword(@Query('email') email: string) {
    try {
      await this.recoverPasswordService.recoverPassword(email);
      return {
        message: eRecoverPasswordMessage.EMAIL_SENT_SUCCESS,
      };
    } catch (error) {
      throw new HttpException(error.message, HttpStatus.BAD_REQUEST);
    }
  }

  @Post('update-password')
  @ApiQuery({ name: 'email', required: true })
  @ApiQuery({ name: 'code', required: true })
  @ApiQuery({ name: 'new-password', required: true })
  async checkRecoveryCodeAndUpdatePassword(
    @Query('email') email: string,
    @Query('code') code: string,
    @Query('new-password') newPassword: string,
  ) {
    try {
      const response =
        await this.recoverPasswordService.checkRecoveryCodeAndUpdatePassword(
          code,
          email,
          newPassword,
        );

      return response;
    } catch (error) {
      throw new HttpException(error.message, HttpStatus.BAD_REQUEST);
    }
  }
}
