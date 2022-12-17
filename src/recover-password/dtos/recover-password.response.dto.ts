import { HttpStatus } from '@nestjs/common';

export class RecoverPasswordRequestDTO {
  userId: string;
  email: string;
  message: string;
  httpStatus: HttpStatus;
}
