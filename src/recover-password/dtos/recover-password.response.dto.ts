import { HttpStatus } from '@nestjs/common';

export class RecoverPasswordRequestDTO {
  userId: number;
  email: string;
  message: string;
  httpStatus: HttpStatus;
}
