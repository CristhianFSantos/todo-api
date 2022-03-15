import { HttpStatus } from '@nestjs/common';
import { Todo } from '@prisma/client';
export interface ITodoResponse {
  todoID?: number;
  todos?: Todo[];
  message?: string;
  HttpStatus: HttpStatus;
}
