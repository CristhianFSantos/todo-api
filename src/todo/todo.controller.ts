import {
  Body,
  Controller,
  Delete,
  Get,
  HttpStatus,
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
import { BEARER_AUTH_NAME } from 'src/shared/const';
import {
  eTodoControllerDescription,
  eTodoMessage,
} from 'src/shared/messages.enum';
import { JwtGuard } from './../auth/guards/jwt.guard';
import { CreateTodoRequestDTO } from './dtos/create-todo.dto';
import { UpdateTodoRequestDTO } from './dtos/update-todo.dto';
import { ITodoResponse } from './models/todo.response';
import { TodoService } from './todo.service';

@ApiTags('Todo')
@Controller('todo')
@ApiBearerAuth(BEARER_AUTH_NAME)
@UseGuards(JwtGuard)
export class TodoController {
  constructor(private readonly todoService: TodoService) {}
  /***********************************************************************************************************************/
  @Get('get-todos-by-id-user')
  @ApiQuery({ name: 'userID', required: true })
  @ApiOperation({
    summary: eTodoControllerDescription.GET_TODOS_BY_ID_USERS,
  })
  async getTodosByIdUser(@Query('userID') userID: number) {
    const todos = await this.todoService.getTodosByIdUser(userID);

    const response: ITodoResponse = {
      todos: todos,
      HttpStatus: HttpStatus.OK,
    };
    return response;
  }
  /***********************************************************************************************************************/
  @Get('get-todos-by-title-per-user')
  @ApiQuery({ name: 'title', required: true })
  @ApiQuery({ name: 'userID', required: true })
  @ApiOperation({
    summary: eTodoControllerDescription.GET_TODO_BY_TITLE,
  })
  async getTodosByTitle(
    @Query('userID') userID: number,
    @Query('title') title: string,
  ) {
    const todos = await this.todoService.getTodosByTitle(title, userID);

    const response: ITodoResponse = {
      todos: todos,
      HttpStatus: HttpStatus.OK,
    };
    return response;
  }
  /***********************************************************************************************************************/
  @Post('create-todo')
  @ApiOperation({
    summary: eTodoControllerDescription.POST_TODO,
  })
  async postTodo(@Body() createTodoRequestDTO: CreateTodoRequestDTO) {
    const todoID = await this.todoService.postTodo(createTodoRequestDTO);

    const response: ITodoResponse = {
      todoID: todoID,
      message: eTodoMessage.TODO_CREATED,
      HttpStatus: HttpStatus.CREATED,
    };
    return response;
  }
  /***********************************************************************************************************************/
  @Delete('delete-todo')
  @ApiQuery({ name: 'todoID', required: true })
  @ApiOperation({
    summary: eTodoControllerDescription.DELETE_TODO_BY_ID,
  })
  async deleteTodo(@Query('todoID') todoID: number) {
    const todoIdDeleted = await this.todoService.deleteTodo(todoID);

    const response: ITodoResponse = {
      todoID: todoIdDeleted,
      message: eTodoMessage.TODO_DELETED,
      HttpStatus: HttpStatus.OK,
    };
    return response;
  }
  /***********************************************************************************************************************/
  @Put('update-todo')
  @ApiQuery({ name: 'todoID', required: true })
  @ApiOperation({
    summary: eTodoControllerDescription.UPDATE_TODO_BY_ID,
  })
  async updateTodo(
    @Query('todoID') todoID: number,
    @Body() updateRequestDTO: UpdateTodoRequestDTO,
  ) {
    const todoIdUpdated = await this.todoService.updateTodo(
      todoID,
      updateRequestDTO,
    );

    const response: ITodoResponse = {
      todoID: todoIdUpdated,
      message: eTodoMessage.TODO_UPDATED,
      HttpStatus: HttpStatus.OK,
    };
    return response;
  }
}
