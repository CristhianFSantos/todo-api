import { Body, Controller, HttpStatus, Post } from '@nestjs/common';
import { ApiOperation, ApiTags } from '@nestjs/swagger';
import {
  eAuthControllerDescription,
  eAuthMessage,
} from 'src/shared/messages.enum';
import { AuthService } from './auth.service';
import { TodoResponseDTO } from './dtos/auth.response.dto';
import { SignInRequestDTO } from './dtos/sign-in-dto';
import { SignUpRequestDTO } from './dtos/sign-up-dto';

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
  ): Promise<TodoResponseDTO> {
    const userID = await this.authService.signUp(singUpRequestDTO);

    const response = new TodoResponseDTO();
    response.userID = userID;
    response.userName = singUpRequestDTO.name;
    response.message = eAuthMessage.SIGN_UP_SUCCESS;
    response.httpStatus = HttpStatus.OK;
    return response;
  }
  /***********************************************************************************************************************/
  @Post('sign-in')
  @ApiOperation({
    summary: eAuthControllerDescription.SIGN_IN,
  })
  async signIn(
    @Body() signInRequestDTO: SignInRequestDTO,
  ): Promise<TodoResponseDTO> {
    const userAuth = await this.authService.signIn(signInRequestDTO);

    const response = new TodoResponseDTO();
    response.userID = userAuth.userID;
    response.userName = userAuth.userName;
    response.message = eAuthMessage.SIGN_IN_SUCCESS;
    response.httpStatus = HttpStatus.OK;
    response.token = userAuth.access_token;
    return response;
  }
}
