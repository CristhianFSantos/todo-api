import { HttpStatus } from '@nestjs/common';
export class TodoResponseDTO {
  todoID: string;
  message: string;
  httpStatus: HttpStatus;
}
