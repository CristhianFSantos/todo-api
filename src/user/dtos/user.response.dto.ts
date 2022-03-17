import { HttpStatus } from '@nestjs/common';
export class UserResponseRequestDTO {
  userID: number;
  message: string;
  httpStatus: HttpStatus;
}
