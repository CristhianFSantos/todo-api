import { Body, Controller, Post } from '@nestjs/common';
import { ApiOperation, ApiTags } from '@nestjs/swagger';
import { MESSAGES_EN } from 'src/messages/messages-en';
import { AuthService } from './auth.service';
import { SignInRequestDTO } from './dto/sign-in.request.dto';
import { SignInResponseDTO } from './dto/sign-in.response.dto';
import { SignUpRequestDTO } from './dto/sign-up.request.dto';
import { SignUpResponseDTO } from './dto/sign-up.response-d.to';

@ApiTags('Auth')
@Controller('auth')
export class AuthController {
  constructor(private readonly authService: AuthService) {}

  @Post('sign-up')
  @ApiOperation({
    summary: MESSAGES_EN.info.sign_up_description,
  })
  async signUp(
    @Body() singUpRequestDTO: SignUpRequestDTO,
  ): Promise<SignUpResponseDTO> {
    return await this.authService.signUp(singUpRequestDTO);
  }

  @Post('sign-in')
  @ApiOperation({
    summary: MESSAGES_EN.info.sign_in_description,
  })
  async signIn(
    @Body() signInRequestDTO: SignInRequestDTO,
  ): Promise<SignInResponseDTO> {
    return await this.authService.signIn(signInRequestDTO);
  }
}
