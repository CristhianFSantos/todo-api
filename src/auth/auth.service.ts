import { HttpException, HttpStatus, Injectable } from '@nestjs/common';
import { JwtService } from '@nestjs/jwt';
import * as argon from 'argon2';
import { randomUUID } from 'node:crypto';
import { eAuthMessage } from 'src/shared/messages.enum';
import { PrismaService } from './../prisma/prisma.service';
import { SignInRequestDTO, SignInResponseDTO } from './dto/sign-in-dto';
import { SignUpRequestDTO } from './dto/sign-up-dto';

@Injectable()
export class AuthService {
  constructor(
    private readonly prismaService: PrismaService,
    private readonly jwtService: JwtService,
  ) {}
  /***********************************************************************************************************************/
  async signUp(signUpRequestDTO: SignUpRequestDTO): Promise<string> {
    try {
      const passwordHash = await argon.hash(signUpRequestDTO.password);

      const user = await this.prismaService.user.create({
        data: {
          userID: randomUUID(),
          name: signUpRequestDTO.name,
          email: signUpRequestDTO.email,
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

    const access_token = this.signToken({
      userID: user.userID,
      name: user.name,
      email: user.email,
    });

    return {
      email: user.email,
      userName: user.name,
      userID: user.userID,
      access_token,
    };
  }
  /***********************************************************************************************************************/
  private signToken(signInResponseDTO: SignInResponseDTO) {
    return this.jwtService.sign(signInResponseDTO, {
      expiresIn: '1d',
      secret: process.env.JWT_SECRET,
    });
  }
}
