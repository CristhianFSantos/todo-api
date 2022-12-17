import { HttpException, HttpStatus, Injectable } from '@nestjs/common';
import { User } from '@prisma/client';
import { PrismaService } from 'src/prisma/prisma.service';
import { eUserMessage } from 'src/shared/messages.enum';
import { UserUpdateRequestDTO } from './dtos/user.update.dto';

@Injectable()
export class UserService {
  constructor(private readonly prismaService: PrismaService) {}
  /***********************************************************************************************************************/
  async deleteUserByID(userID: string): Promise<string> {
    try {
      const user = await this.prismaService.user.findUnique({
        where: { userID: userID.toString() },
      });

      if (!user)
        throw new HttpException(
          eUserMessage.USER_NOT_FOUND,
          HttpStatus.NOT_FOUND,
        );

      await this.prismaService.user.delete({
        where: { userID: userID.toString() },
      });

      return user.userID;
    } catch (error) {
      throw new HttpException(
        eUserMessage.REQUEST_ERROR + error,
        HttpStatus.BAD_REQUEST,
      );
    }
  }
  /***********************************************************************************************************************/
  async updateUserByID(
    userID: string,
    updateUserRequestDTO: UserUpdateRequestDTO,
  ) {
    try {
      const user = await this.prismaService.user.findUnique({
        where: { userID: userID.toString() },
      });

      if (!user)
        throw new HttpException(
          eUserMessage.USER_NOT_FOUND,
          HttpStatus.NOT_FOUND,
        );

      await this.prismaService.user.update({
        where: { userID: userID.toString() },
        data: {
          name: updateUserRequestDTO.name,
          email: updateUserRequestDTO.email,
        },
      });
      return user.userID;
    } catch (error) {
      throw new HttpException(
        eUserMessage.REQUEST_ERROR + error,
        HttpStatus.BAD_REQUEST,
      );
    }
  }
  /***********************************************************************************************************************/
  async getAllUsers(): Promise<User[]> {
    try {
      const users = await this.prismaService.user.findMany({
        orderBy: { userID: 'asc' },
      });
      return users;
    } catch (error) {
      throw new HttpException(
        eUserMessage.REQUEST_ERROR + error,
        HttpStatus.BAD_REQUEST,
      );
    }
  }
}
