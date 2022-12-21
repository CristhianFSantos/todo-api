import { HttpException, HttpStatus, Injectable } from '@nestjs/common';
import { Todo } from '@prisma/client';
import { randomUUID } from 'node:crypto';
import { MESSAGES_EN } from 'src/messages/messages-en';
import { PrismaService } from '../database/prisma/prisma.service';
import { TodoCreateRequestDTO } from './dto/todo.create.request.dto';
import { TodoResponseDTO } from './dto/todo.response';
import { TodoUpdateRequestDTO } from './dto/todo.update.request.dto';

@Injectable()
export class TodoService {
  constructor(private readonly prismaService: PrismaService) {}

  async getTodosByuserID(userID: string): Promise<Todo[]> {
    try {
      return await this.prismaService.todo.findMany({
        where: { userID },
        orderBy: { todoID: 'asc' },
      });
    } catch (error) {
      throw new HttpException(error, HttpStatus.BAD_REQUEST);
    }
  }

  async getTodosByTitle(searchText: string, userID: string): Promise<Todo[]> {
    try {
      return await this.prismaService.todo.findMany({
        where: {
          userID: userID.toString(),
          title: {
            contains: searchText,
            mode: 'insensitive',
          },
        },
      });
    } catch (error) {
      throw new HttpException(error, HttpStatus.BAD_REQUEST);
    }
  }

  async postTodo(todoCreateRequestDTO: TodoCreateRequestDTO): Promise<Todo> {
    try {
      const { title, description, completed, createdAt, userID } =
        todoCreateRequestDTO;

      const todo = await this.prismaService.todo.create({
        data: {
          todoID: randomUUID(),
          title,
          completed,
          description,
          createdAt: new Date(createdAt),
          user: {
            connect: {
              userID,
            },
          },
        },
      });

      return todo;
    } catch (error) {
      throw new HttpException(error, HttpStatus.BAD_REQUEST);
    }
  }

  async deleteTodo(todoID: string): Promise<Todo> {
    try {
      const todo = await this.prismaService.todo.findUnique({
        where: { todoID },
      });

      if (!todo)
        throw new HttpException(
          MESSAGES_EN.error.todoNotFound,
          HttpStatus.NOT_FOUND,
        );

      await this.prismaService.todo.delete({
        where: { todoID },
      });

      return todo;
    } catch (error) {
      throw new HttpException(error, HttpStatus.BAD_REQUEST);
    }
  }

  async updateTodo(
    todoID: string,
    todoUpdateRequestDTO: TodoUpdateRequestDTO,
  ): Promise<TodoResponseDTO> {
    try {
      const { title, completed, createdAt, description, userID } =
        todoUpdateRequestDTO;

      const todo = await this.prismaService.todo.findUnique({
        where: { todoID },
      });

      if (!todo)
        throw new HttpException(
          MESSAGES_EN.error.todoNotFound,
          HttpStatus.NOT_FOUND,
        );

      await this.prismaService.todo.update({
        where: { todoID },
        data: {
          title,
          completed,
          description,
          createdAt: new Date(createdAt),
          user: {
            connect: {
              userID,
            },
          },
        },
      });

      return new TodoResponseDTO({
        todoID,
        title,
        completed,
        description,
        createdAt,
        userID,
      });
    } catch (error) {
      throw new HttpException(error, HttpStatus.BAD_REQUEST);
    }
  }
}
