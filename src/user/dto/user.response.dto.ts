import { HttpStatus } from '@nestjs/common';
export class UserResponseRequestDTO {
  userID: string;
  message: string;
  httpStatus: HttpStatus;
}
