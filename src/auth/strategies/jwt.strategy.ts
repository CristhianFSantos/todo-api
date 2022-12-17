import { HttpStatus, Injectable, UnauthorizedException } from '@nestjs/common';
import { PassportStrategy } from '@nestjs/passport';
import { ExtractJwt, Strategy } from 'passport-jwt';
import { MESSAGES_EN } from 'src/messages/messages-en';
import { PrismaService } from './../../prisma/prisma.service';

@Injectable()
export class JwtStrategy extends PassportStrategy(Strategy, 'jwt') {
  constructor(private readonly prismaService: PrismaService) {
    super({
      jwtFromRequest: ExtractJwt.fromAuthHeaderAsBearerToken(),
      secretOrKey: process.env.JWT_SECRET,
    });
  }

  // método invocado pelo passport, para validar se os dados presentes no token existem no banco de dados
  async validate(payload: any): Promise<boolean> {
    const { userID, tokenExpiration } = payload;

    const invalidDate = new Date(Date.now()) > new Date(tokenExpiration);

    if (invalidDate) {
      throw new UnauthorizedException({
        message: MESSAGES_EN.error.tokenExpired,
        statusCode: HttpStatus.UNAUTHORIZED,
      });
    }

    const user = await this.prismaService.user.findUnique({
      where: { userID },
    });

    if (!user) {
      throw new UnauthorizedException({
        message: MESSAGES_EN.error.userNotFound,
        statusCode: HttpStatus.UNAUTHORIZED,
      });
    }

    return !!user;
  }
}
