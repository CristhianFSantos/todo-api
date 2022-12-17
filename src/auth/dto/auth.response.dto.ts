import { HttpStatus } from '@nestjs/common';
export class TodoResponseDTO {
  userID: string;
  userName: string;
  message: string;
  httpStatus: HttpStatus;
  token: string;
}
