import { HttpStatus } from '@nestjs/common';
export class TodoResponseDTO {
  todoID: number;
  message: string;
  httpStatus: HttpStatus;
}
