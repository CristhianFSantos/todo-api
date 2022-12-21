import { Controller, Post, Query } from '@nestjs/common';
import { ApiOperation, ApiQuery, ApiTags } from '@nestjs/swagger';
import { MESSAGES_EN } from 'src/messages/messages-en';
import { RecoverPasswordRequestDTO } from './dto/recover-password.request.dto';
import { RecoverPasswordService } from './recover-password.service';

@ApiTags('Recover Password')
@Controller('recover-password')
export class RecoverPasswordController {
  constructor(private recoverPasswordService: RecoverPasswordService) {}

  @Post('send-email')
  @ApiOperation({
    summary: MESSAGES_EN.info.recoverPasswordDescription,
  })
  @ApiQuery({ name: 'email', required: true })
  async recoverPassword(@Query('email') email: string) {
    return {
      message: await this.recoverPasswordService.recoverPassword(email),
    };
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
    return await this.recoverPasswordService.checkRecoveryCodeAndUpdatePassword(
      {
        email,
        code,
        newPassword,
      } as RecoverPasswordRequestDTO,
    );
  }
}
