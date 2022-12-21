import {
  Body,
  Controller,
  Delete,
  Get,
  Post,
  Put,
  Query,
  UseGuards,
} from '@nestjs/common';
import {
  ApiBearerAuth,
  ApiOperation,
  ApiQuery,
  ApiTags,
} from '@nestjs/swagger';
import { Todo } from '@prisma/client';
import { MESSAGES_EN } from 'src/messages/messages-en';
import { BEARER_AUTH_NAME } from 'src/swagger/swagger.config';
import { JwtGuard } from './../auth/guards/jwt.guard';
import { TodoCreateRequestDTO } from './dto/todo.create.request.dto';
import { TodoResponseDTO } from './dto/todo.response';
import { TodoUpdateRequestDTO } from './dto/todo.update.request.dto';

import { TodoService } from './todo.service';

@ApiTags('Todo')
@Controller('todo')
@ApiBearerAuth(BEARER_AUTH_NAME)
@UseGuards(JwtGuard)
export class TodoController {
  constructor(private readonly todoService: TodoService) {}

  @Get('get-todos-by-id-user')
  @ApiQuery({ name: 'userID', required: true })
  @ApiOperation({
    summary: MESSAGES_EN.info.todoGetByIdDescription,
  })
  async getTodosByIdUser(@Query('userID') userID: string) {
    return await this.todoService.getTodoByUserID(userID);
  }

  @Get('get-todos-by-title-per-user')
  @ApiQuery({ name: 'title', required: true })
  @ApiQuery({ name: 'userID', required: true })
  @ApiOperation({
    summary: MESSAGES_EN.info.todoGetByTitleDescription,
  })
  async getTodosByTitle(
    @Query('userID') userID: string,
    @Query('title') title: string,
  ) {
    return await this.todoService.getTodosByTitle(title, userID);
  }

  @Post('create-todo')
  @ApiOperation({
    summary: MESSAGES_EN.info.todoCreateDescription,
  })
  async postTodo(
    @Body() todoCreateRequestDTO: TodoCreateRequestDTO,
  ): Promise<Todo> {
    return await this.todoService.postTodo(todoCreateRequestDTO);
  }

  @Delete('delete-todo')
  @ApiQuery({ name: 'todoID', required: true })
  @ApiOperation({
    summary: MESSAGES_EN.info.todoDeleteDescription,
  })
  async deleteTodo(@Query('todoID') todoID: string): Promise<Todo> {
    return await this.todoService.deleteTodo(todoID);
  }

  @Put('update-todo')
  @ApiQuery({ name: 'todoID', required: true })
  @ApiOperation({
    summary: MESSAGES_EN.info.todoUpdateDescription,
  })
  async updateTodo(
    @Query('todoID') todoID: string,
    @Body() todoUpdateRequestDTO: TodoUpdateRequestDTO,
  ): Promise<TodoResponseDTO> {
    return await this.todoService.updateTodo(todoID, todoUpdateRequestDTO);
  }
}
