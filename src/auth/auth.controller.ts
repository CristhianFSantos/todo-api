import { Body, Controller, HttpStatus, Post } from '@nestjs/common';
import { ApiOperation, ApiTags } from '@nestjs/swagger';
import {
  eAuthControllerDescription,
  eAuthMessage,
} from 'src/shared/messages.enum';
import { AuthService } from './auth.service';
import { SignInRequestDTO } from './dtos/sign-in-dto';
import { SignUpRequestDTO } from './dtos/sign-up-dto';
import { IAuthResponse } from './models/auth.response';

@ApiTags('Auth')
@Controller('auth')
export class AuthController {
  constructor(private readonly authService: AuthService) {}

  /***********************************************************************************************************************/
  @Post('sign-up')
  @ApiOperation({
    summary: eAuthControllerDescription.SIGN_UP,
  })
  async signUp(
    @Body() singUpRequestDTO: SignUpRequestDTO,
  ): Promise<IAuthResponse> {
    const userID = await this.authService.signUp(singUpRequestDTO);

    const response: IAuthResponse = {
      userID: userID,
      massage: eAuthMessage.SIGN_UP_SUCCESS,
      HttpStatus: HttpStatus.CREATED,
    };
    return response;
  }
  /***********************************************************************************************************************/
  @Post('sign-in')
  @ApiOperation({
    summary: eAuthControllerDescription.SIGN_IN,
  })
  async signIn(
    @Body() signInRequestDTO: SignInRequestDTO,
  ): Promise<IAuthResponse> {
    const userAuth = await this.authService.signIn(signInRequestDTO);

    const response: IAuthResponse = {
      token: userAuth.access_token,
      userID: userAuth.userID,
      massage: eAuthMessage.SIGN_IN_SUCCESS,
      HttpStatus: HttpStatus.OK,
    };
    return response;
  }
  /***********************************************************************************************************************/
}
