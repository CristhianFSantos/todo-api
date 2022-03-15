import {
  Body,
  Controller,
  Delete,
  Get,
  HttpStatus,
  Post,
  Put,
  Query,
} from '@nestjs/common';
import { ApiOperation, ApiQuery, ApiTags } from '@nestjs/swagger';
import { User } from '@prisma/client';
import {
  eAuthControllerDescription,
  eAuthMessage,
} from 'src/shared/messages.enum';
import { AuthService } from './auth.service';
import { SignInRequestDTO } from './dtos/sign-in-dto';
import { SignUpRequestDTO } from './dtos/sign-up-dto';
import { UpdateUserRequestDTO } from './dtos/update.dto';
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
    const token = await this.authService.signIn(signInRequestDTO);

    const response: IAuthResponse = {
      token: token,
      massage: eAuthMessage.SIGN_IN_SUCCESS,
      HttpStatus: HttpStatus.OK,
    };
    return response;
  }
  /***********************************************************************************************************************/

  @Delete('delete-user-by-id')
  @ApiQuery({ name: 'userID', required: true })
  @ApiOperation({
    summary: eAuthControllerDescription.DELETE_USER_BY_ID,
  })
  async deleteUser(@Query('userID') userID: number): Promise<IAuthResponse> {
    const userIdDeleted = await this.authService.deleteUserByID(userID);

    const response: IAuthResponse = {
      userID: userIdDeleted,
      massage: eAuthMessage.DELETE_USER_SUCCESS,
      HttpStatus: HttpStatus.OK,
    };
    return response;
  }
  /***********************************************************************************************************************/
  @Put('update-user-by-id')
  @ApiQuery({ name: 'userID', required: true })
  @ApiOperation({
    summary: eAuthControllerDescription.UPDATE_USER_BY_ID,
  })
  async updateUserByID(
    @Query('userID') userID: number,
    @Body() updateUserRequestDTO: UpdateUserRequestDTO,
  ): Promise<IAuthResponse> {
    const userIdUpdated = await this.authService.updateUserByID(
      userID,
      updateUserRequestDTO,
    );
    const response: IAuthResponse = {
      userID: userIdUpdated,
      massage: eAuthMessage.USER_UPDATE_SUCCESS,
      HttpStatus: HttpStatus.OK,
    };
    return response;
  }
  /***********************************************************************************************************************/
  @Get('get-all-users')
  @ApiOperation({
    summary: eAuthControllerDescription.GET_ALL_USERS,
  })
  async getAllUsers(): Promise<User[]> {
    return await this.authService.getAllUsers();
  }
}
