import { HttpStatus } from '@nestjs/common';
export class TodoResponseDTO {
  userID: number;
  userName: string;
  message: string;
  httpStatus: HttpStatus;
  token: string;
}
