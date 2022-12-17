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
import { JwtGuard } from 'src/auth/guards/jwt.guard';

import {
  eUserControllerDescription,
  eUserMessage,
} from 'src/shared/messages.enum';
import { BEARER_AUTH_NAME } from 'src/swagger.config';
import { UserResponseRequestDTO } from './dtos/user.response.dto';
import { UserUpdateRequestDTO } from './dtos/user.update.dto';
import { UserService } from './user.service';

@ApiTags('User')
@UseGuards(JwtGuard)
@ApiBearerAuth(BEARER_AUTH_NAME)
@Controller('user')
export class UserController {
  constructor(private readonly userService: UserService) {}
  @Delete('delete-user-by-id')
  @ApiQuery({ name: 'userID', required: true })
  @ApiOperation({
    summary: eUserControllerDescription.USER_DELETED,
  })
  async deleteUserByID(
    @Query('userID') userID: number,
  ): Promise<UserResponseRequestDTO> {
    const userIdDeleted = await this.userService.deleteUserByID(userID);

    const response = new UserResponseRequestDTO();
    response.userID = userIdDeleted;
    response.message = eUserMessage.USER_DELETE_SUCCESS;
    response.httpStatus = HttpStatus.OK;
    return response;
  }
  /***********************************************************************************************************************/
  @Put('update-user-by-id')
  @ApiQuery({ name: 'userID', required: true })
  @ApiOperation({
    summary: eUserControllerDescription.USER_UPDATED,
  })
  async updateUserByID(
    @Query('userID') userID: number,
    @Body() userUpdateRequestDTO: UserUpdateRequestDTO,
  ): Promise<UserResponseRequestDTO> {
    const userIdUpdated = await this.userService.updateUserByID(
      userID,
      userUpdateRequestDTO,
    );

    const response = new UserResponseRequestDTO();
    response.userID = userIdUpdated;
    response.message = eUserMessage.USER_UPDATE_SUCCESS;
    response.httpStatus = HttpStatus.OK;
    return response;
  }
  /***********************************************************************************************************************/
  @Get('get-all-users')
  @ApiOperation({
    summary: eUserControllerDescription.USER_GET_ALL,
  })
  async getAllUsers(): Promise<User[]> {
    return await this.userService.getAllUsers();
  }
}
