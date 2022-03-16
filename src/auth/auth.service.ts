import { HttpException, HttpStatus, Injectable } from '@nestjs/common';
import { JwtService } from '@nestjs/jwt';
import { User } from '@prisma/client';
import * as argon from 'argon2';
import { eAuthMessage } from 'src/shared/messages.enum';
import { PrismaService } from './../prisma/prisma.service';
import { SignInRequestDTO, SignInResponseDTO } from './dtos/sign-in-dto';
import { SignUpRequestDTO } from './dtos/sign-up-dto';
import { UpdateUserRequestDTO } from './dtos/update.dto';

@Injectable()
export class AuthService {
  constructor(
    private readonly prismaService: PrismaService,
    private readonly jwtService: JwtService,
  ) {}

  //MÉTODO USA A BIBLIOTECA ARGON2 PARA CRIPTOGRAFAR A SENHA E CADASTRA O USUÁRIO NO BANCO DE DADOS COM UM HASH NA SENHA
  /***********************************************************************************************************************/
  async signUp(signUpRequestDTO: SignUpRequestDTO): Promise<number> {
    try {
      const passwordHash = await argon.hash(signUpRequestDTO.password);

      const user = await this.prismaService.user.create({
        data: {
          name: signUpRequestDTO.name,
          email: signUpRequestDTO.email,
          admin: signUpRequestDTO.admin,
          password: passwordHash,
        },
      });

      return user.userID;
    } catch (error) {
      throw new HttpException(
        `${eAuthMessage.EMAIL_ALREADY_EXISTS} or ${error}`,
        HttpStatus.BAD_REQUEST,
      );
    }
  }
  // MÉTODO PARA VERIFICAR SE O USUÁRIO E A SENHA ESTÃO CORRETOS, É USADO A BIBLIOTECA ARGON2 PARA VERIFICAR A SENHA E RETORNA O TOKEN DO USUÁRIO
  /***********************************************************************************************************************/
  async signIn(signInRequestDTO: SignInRequestDTO) {
    const user = await this.prismaService.user.findUnique({
      where: { email: signInRequestDTO.email },
    });

    if (!user)
      throw new HttpException(
        eAuthMessage.INVALID_CREDENTIALS,
        HttpStatus.UNAUTHORIZED,
      );

    const passwordMatches = await argon.verify(
      user.password,
      signInRequestDTO.password,
    );

    if (!passwordMatches)
      throw new HttpException(
        eAuthMessage.INVALID_CREDENTIALS,
        HttpStatus.UNAUTHORIZED,
      );

    const access_token = await this.signToken({
      userID: user.userID,
      name: user.name,
      email: user.email,
    });

    return {
      userID: user.userID,
      access_token,
    };
  }
  /***********************************************************************************************************************/
  async deleteUserByID(userID: number): Promise<number> {
    try {
      const user = await this.prismaService.user.findUnique({
        where: { userID: parseInt(userID.toString()) },
      });

      if (!user)
        throw new HttpException(
          eAuthMessage.USER_NOT_FOUND,
          HttpStatus.NOT_FOUND,
        );

      await this.prismaService.user.delete({
        where: { userID: parseInt(userID.toString()) },
      });

      return user.userID;
    } catch (error) {
      throw new HttpException(
        eAuthMessage.REQUEST_ERROR + error,
        HttpStatus.BAD_REQUEST,
      );
    }
  }
  /***********************************************************************************************************************/
  async updateUserByID(
    userID: number,
    updateUserRequestDTO: UpdateUserRequestDTO,
  ) {
    try {
      const user = await this.prismaService.user.findUnique({
        where: { userID: parseInt(userID.toString()) },
      });

      if (!user)
        throw new HttpException(
          eAuthMessage.USER_NOT_FOUND,
          HttpStatus.NOT_FOUND,
        );

      await this.prismaService.user.update({
        where: { userID: parseInt(userID.toString()) },
        data: {
          name: updateUserRequestDTO.name,
          email: updateUserRequestDTO.email,
          admin: updateUserRequestDTO.admin,
        },
      });
      return user.userID;
    } catch (error) {
      throw new HttpException(
        eAuthMessage.REQUEST_ERROR + error,
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
        eAuthMessage.REQUEST_ERROR + error,
        HttpStatus.BAD_REQUEST,
      );
    }
  }
  /***********************************************************************************************************************/
  private signToken(signInResponseDTO: SignInResponseDTO) {
    return this.jwtService.sign(signInResponseDTO, {
      expiresIn: '1d',
      secret: process.env.JWT_SECRET,
    });
  }
}
