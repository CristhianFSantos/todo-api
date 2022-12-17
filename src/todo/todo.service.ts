import { HttpException, HttpStatus, Injectable } from '@nestjs/common';
import { Todo } from '@prisma/client';
import { randomUUID } from 'node:crypto';
import { eTodoMessage } from 'src/shared/messages.enum';
import { PrismaService } from '../database/prisma/prisma.service';
import { TodoCreateRequestDTO } from './dtos/todo.create.dto';
import { TodoUpdateRequestDTO } from './dtos/todo.update.dto';

@Injectable()
export class TodoService {
  constructor(private readonly prismaService: PrismaService) {}

  /***********************************************************************************************************************/
  async getTodosByIdUser(userID: string): Promise<Todo[]> {
    try {
      return await this.prismaService.todo.findMany({
        where: { userID: userID.toString() },
        orderBy: { todoID: 'asc' },
      });
    } catch (error) {
      throw new HttpException(
        eTodoMessage.REQUEST_ERROR + error,
        HttpStatus.BAD_REQUEST,
      );
    }
  }
  /***********************************************************************************************************************/
  async getTodosByTitle(title: string, userID: string): Promise<Todo[]> {
    try {
      const todos = await this.prismaService.todo.findMany({
        where: {
          userID: userID.toString(),
          title: {
            contains: title,
            mode: 'insensitive',
          },
        },
      });

      return todos;
    } catch (error) {
      throw new HttpException(
        eTodoMessage.REQUEST_ERROR + error,
        HttpStatus.BAD_REQUEST,
      );
    }
  }
  /***********************************************************************************************************************/
  async postTodo(createTodoRequestDTO: TodoCreateRequestDTO): Promise<string> {
    try {
      const todo = await this.prismaService.todo.create({
        data: {
          todoID: randomUUID(),
          title: createTodoRequestDTO.title,
          completed: createTodoRequestDTO.completed,
          description: createTodoRequestDTO.description,
          createdAt: new Date(createTodoRequestDTO.createdAt),
          user: {
            connect: {
              userID: createTodoRequestDTO.userID,
            },
          },
        },
      });

      return todo.todoID;
    } catch (error) {
      throw new HttpException(
        eTodoMessage.REQUEST_ERROR + error,
        HttpStatus.BAD_REQUEST,
      );
    }
  }
  /***********************************************************************************************************************/
  async deleteTodo(todoID: string): Promise<string> {
    try {
      const todo = await this.prismaService.todo.findUnique({
        where: { todoID: todoID.toString() },
      });

      if (!todo)
        throw new HttpException(
          eTodoMessage.TODO_NOT_FOUND,
          HttpStatus.NOT_FOUND,
        );

      await this.prismaService.todo.delete({
        where: { todoID: todoID.toString() },
      });

      return todo.todoID;
    } catch (error) {
      throw new HttpException(
        eTodoMessage.REQUEST_ERROR + error,
        HttpStatus.BAD_REQUEST,
      );
    }
  }
  /***********************************************************************************************************************/
  async updateTodo(
    todoID: string,
    updateRequestDTO: TodoUpdateRequestDTO,
  ): Promise<string> {
    try {
      const todo = await this.prismaService.todo.findUnique({
        where: { todoID: todoID.toString() },
      });

      if (!todo)
        throw new HttpException(
          eTodoMessage.TODO_NOT_FOUND,
          HttpStatus.NOT_FOUND,
        );

      await this.prismaService.todo.update({
        where: { todoID: todoID.toString() },
        data: {
          title: updateRequestDTO.title,
          completed: updateRequestDTO.completed,
          description: updateRequestDTO.description,
          createdAt: new Date(updateRequestDTO.createdAt),
          user: {
            connect: {
              userID: updateRequestDTO.userID,
            },
          },
        },
      });

      return todo.todoID;
    } catch (error) {
      throw new HttpException(
        eTodoMessage.REQUEST_ERROR + error,
        HttpStatus.BAD_REQUEST,
      );
    }
  }
}
