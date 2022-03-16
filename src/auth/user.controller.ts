import {
  Body,
  Controller,
  Delete,
  Get,
  HttpStatus,
  Put,
  Query,
  UseGuards,
} from '@nestjs/common';
import {
  ApiBearerAuth,
  ApiOperation,
  ApiQuery,
  ApiTags,
} from '@nestjs/swagger';
import { User } from '@prisma/client';
import { BEARER_AUTH_NAME } from 'src/shared/const';
import {
  eAuthControllerDescription,
  eAuthMessage,
} from 'src/shared/messages.enum';
import { AuthService } from './auth.service';
import { UpdateUserRequestDTO } from './dtos/update.dto';
import { JwtGuard } from './guards/jwt.guard';
import { IAuthResponse } from './models/auth.response';

@ApiTags('User')
@UseGuards(JwtGuard)
@ApiBearerAuth(BEARER_AUTH_NAME)
@Controller('user')
export class UserController {
  constructor(private readonly authService: AuthService) {}
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
