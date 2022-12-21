import { HttpException, HttpStatus, Injectable } from '@nestjs/common';
import { JwtService } from '@nestjs/jwt';
import * as argon from 'argon2';
import { randomUUID } from 'node:crypto';
import { EmailRegistrationService } from 'src/job/email-registration/email-registration.service';
import { MESSAGES_EN } from 'src/messages/messages-en';
import { PrismaService } from '../database/prisma/prisma.service';
import { SignInRequestDTO } from './dto/sign-in.request.dto';
import { SignInResponseDTO } from './dto/sign-in.response.dto';
import { SignUpRequestDTO } from './dto/sign-up.request.dto';
import { SignUpResponseDTO } from './dto/sign-up.response-d.to';

@Injectable()
export class AuthService {
  constructor(
    private readonly prismaService: PrismaService,
    private readonly jwtService: JwtService,
    private readonly sendEmailRegistrationService: EmailRegistrationService,
  ) {}

  async signUp(signUpRequestDTO: SignUpRequestDTO): Promise<SignUpResponseDTO> {
    try {
      const { name, email } = signUpRequestDTO;
      const password = await argon.hash(signUpRequestDTO.password);
      const userID = randomUUID();

      const user = await this.prismaService.user.create({
        data: {
          userID,
          name,
          email,
          password,
        },
      });

      this.sendEmailRegistrationService.addQueueEmailRegistrationJob({
        name,
        email,
      });

      return new SignUpResponseDTO(user);
    } catch (error) {
      const codePrismaUniqueConstraint = 'P2002';
      throw new HttpException(
        error.code === codePrismaUniqueConstraint
          ? MESSAGES_EN.error.emailAlreadyExists
          : error,
        HttpStatus.BAD_REQUEST,
      );
    }
  }

  async signIn(signInRequestDTO: SignInRequestDTO): Promise<SignInResponseDTO> {
    const { email, password } = signInRequestDTO;

    const user = await this.prismaService.user.findUnique({
      where: { email },
    });

    if (!user)
      throw new HttpException(
        MESSAGES_EN.error.invalidCredentials,
        HttpStatus.UNAUTHORIZED,
      );

    const passwordMatches = await argon.verify(user.password, password);

    if (!passwordMatches)
      throw new HttpException(
        MESSAGES_EN.error.invalidCredentials,
        HttpStatus.UNAUTHORIZED,
      );

    const signInResponse = new SignInResponseDTO({
      userID: user.userID,
      name: user.name,
      email: user.email,
    });

    const sevenDaysInMilliseconds = 604800000;
    signInResponse.tokenExpiration = new Date(
      Date.now() + sevenDaysInMilliseconds,
    );

    signInResponse.token = this.buildToken(signInResponse);

    return signInResponse;
  }

  private buildToken(dataToken: SignInResponseDTO) {
    delete dataToken.token;
    const sevenDaysInSecods = 604800;
    const config = {
      expiresIn: sevenDaysInSecods,
      secret: process.env.JWT_SECRET,
    };
    return this.jwtService.sign({ ...dataToken }, config);
  }
}
