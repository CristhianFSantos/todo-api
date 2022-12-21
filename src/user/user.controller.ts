import {
  Body,
  Controller,
  Delete,
  Get,
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
import { JwtGuard } from 'src/auth/guards/jwt.guard';
import { MESSAGES_EN } from 'src/messages/messages-en';

import { BEARER_AUTH_NAME } from 'src/swagger/swagger.config';
import { UserResponseDTO } from './dto/user.response.dto';

import { UserRequestUpdateDTO } from './dto/user.request.update.dto';
import { UserService } from './user.service';

@ApiTags('User')
@UseGuards(JwtGuard)
@ApiBearerAuth(BEARER_AUTH_NAME)
@Controller('user')
export class UserController {
  constructor(private readonly userService: UserService) {}

  @Get('get-all-users')
  @ApiOperation({
    summary: MESSAGES_EN.info.userGetAllDescription,
  })
  async getAllUsers(): Promise<UserResponseDTO[]> {
    return await this.userService.getAllUsers();
  }

  @Delete('delete-user-by-id')
  @ApiQuery({ name: 'userID', required: true })
  @ApiOperation({
    summary: MESSAGES_EN.info.userDeletedDescription,
  })
  async deleteUserByID(
    @Query('userID') userID: string,
  ): Promise<UserResponseDTO> {
    return await this.userService.deleteUserByID(userID);
  }

  @Put('update-user-by-id')
  @ApiQuery({ name: 'userID', required: true })
  @ApiOperation({
    summary: MESSAGES_EN.info.userUpdatedDescription,
  })
  async updateUserByID(
    @Query('userID') userID: string,
    @Body() userUpdateRequestDTO: UserRequestUpdateDTO,
  ): Promise<UserResponseDTO> {
    return await this.userService.updateUserByID(userID, userUpdateRequestDTO);
  }
}
