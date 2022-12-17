import { HttpException, HttpStatus, Injectable } from '@nestjs/common';
import { PrismaService } from 'src/database/prisma/prisma.service';
import { MESSAGES_EN } from 'src/messages/messages-en';
import { UserRequestUpdateDTO } from './dto/user.request.update.dto';
import { UserResponseDTO } from './dto/user.response.dto';

@Injectable()
export class UserService {
  constructor(private readonly prismaService: PrismaService) {}

  async getAllUsers(): Promise<UserResponseDTO[]> {
    try {
      const users = await this.prismaService.user.findMany({
        orderBy: { userID: 'asc' },
      });

      return users.map((user) => new UserResponseDTO(user));
    } catch (error) {
      throw new HttpException(error, HttpStatus.BAD_REQUEST);
    }
  }

  async deleteUserByID(userID: string): Promise<UserResponseDTO> {
    try {
      const whereObject = { where: { userID } };
      const user = await this.prismaService.user.findUnique(whereObject);

      if (!user)
        throw new HttpException(
          MESSAGES_EN.error.userNotFound,
          HttpStatus.NOT_FOUND,
        );

      await this.prismaService.user.delete(whereObject);

      return new UserResponseDTO(user);
    } catch (error) {
      throw new HttpException(error, HttpStatus.BAD_REQUEST);
    }
  }

  async updateUserByID(
    userID: string,
    userRequestUpdateDTO: UserRequestUpdateDTO,
  ) {
    try {
      const { name, email } = userRequestUpdateDTO;

      const user = await this.prismaService.user.findUnique({
        where: { userID },
      });

      if (!user)
        throw new HttpException(
          MESSAGES_EN.error.userNotFound,
          HttpStatus.NOT_FOUND,
        );

      if (user.email === email || user.name === name) {
        throw new HttpException(
          MESSAGES_EN.error.repeatedData,
          HttpStatus.BAD_REQUEST,
        );
      }

      await this.prismaService.user.update({
        where: { userID },
        data: {
          name,
          email,
        },
      });

      return new UserResponseDTO({
        userID,
        name,
        email,
      });
    } catch (error) {
      throw new HttpException(error, HttpStatus.BAD_REQUEST);
    }
  }
}
