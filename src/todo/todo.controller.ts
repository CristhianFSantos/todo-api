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
import { BEARER_AUTH_NAME } from 'src/shared/constants';
import {
  eTodoControllerDescription,
  eTodoMessage,
} from 'src/shared/messages.enum';
import { JwtGuard } from './../auth/guards/jwt.guard';
import { TodoCreateRequestDTO } from './dtos/todo.create.dto';
import { TodoResponseDTO } from './dtos/todo.response.dto';
import { TodoUpdateRequestDTO } from './dtos/todo.update.dto';
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
    summary: eTodoControllerDescription.TODO_GET_BY_ID_USER,
  })
  async getTodosByIdUser(@Query('userID') userID: number) {
    const todos = await this.todoService.getTodosByIdUser(userID);
    return todos;
  }
  /***********************************************************************************************************************/
  @Get('get-todos-by-title-per-user')
  @ApiQuery({ name: 'title', required: true })
  @ApiQuery({ name: 'userID', required: true })
  @ApiOperation({
    summary: eTodoControllerDescription.TODO_GET_BY_TITLE,
  })
  async getTodosByTitle(
    @Query('userID') userID: number,
    @Query('title') title: string,
  ) {
    const todos = await this.todoService.getTodosByTitle(title, userID);
    return todos;
  }
  /***********************************************************************************************************************/
  @Post('create-todo')
  @ApiOperation({
    summary: eTodoControllerDescription.TODO_CREATE,
  })
  async postTodo(@Body() todoCreateRequestDTO: TodoCreateRequestDTO) {
    const todoID = await this.todoService.postTodo(todoCreateRequestDTO);

    const response = new TodoResponseDTO();
    response.todoID = todoID;
    response.message = eTodoMessage.TODO_CREATED_SUCCESS;
    response.httpStatus = HttpStatus.CREATED;
    return response;
  }
  /***********************************************************************************************************************/
  @Delete('delete-todo')
  @ApiQuery({ name: 'todoID', required: true })
  @ApiOperation({
    summary: eTodoControllerDescription.TODO_DELETE_BY_ID,
  })
  async deleteTodo(@Query('todoID') todoID: number) {
    const todoIdDeleted = await this.todoService.deleteTodo(todoID);

    const response = new TodoResponseDTO();
    response.todoID = todoIdDeleted;
    response.message = eTodoMessage.TODO_DELETED_SUCCESS;
    response.httpStatus = HttpStatus.OK;
    return response;
  }
  /***********************************************************************************************************************/
  @Put('update-todo')
  @ApiQuery({ name: 'todoID', required: true })
  @ApiOperation({
    summary: eTodoControllerDescription.TODO_UPDATE_BY_ID,
  })
  async updateTodo(
    @Query('todoID') todoID: number,
    @Body() updateRequestDTO: TodoUpdateRequestDTO,
  ) {
    const todoIdUpdated = await this.todoService.updateTodo(
      todoID,
      updateRequestDTO,
    );
    const response = new TodoResponseDTO();
    response.todoID = todoIdUpdated;
    response.message = eTodoMessage.TODO_UPDATED_SUCCESS;
    response.httpStatus = HttpStatus.OK;
    return response;
  }
}
