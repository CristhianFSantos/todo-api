import { ApiProperty } from '@nestjs/swagger';
import { IsBoolean, IsNotEmpty, IsString, Length } from 'class-validator';
import { SCHEMAS_TEXT } from 'src/swagger/swagger.schemas.text';

export class TodoCreateRequestDTO {
  @IsNotEmpty()
  @IsString()
  @Length(3, 50)
  @ApiProperty({
    description: SCHEMAS_TEXT.todo_create_request.title.description,
    default: SCHEMAS_TEXT.todo_create_request.title.default,
  })
  title: string;

  @IsNotEmpty()
  @IsBoolean()
  @ApiProperty({
    description: SCHEMAS_TEXT.todo_create_request.completed.description,
    default: SCHEMAS_TEXT.todo_create_request.completed.default,
  })
  completed: boolean;

  @IsNotEmpty()
  @IsString()
  @ApiProperty({
    description: SCHEMAS_TEXT.todo_create_request.description.description,
    default: SCHEMAS_TEXT.todo_create_request.description.default,
  })
  description: string;

  @IsNotEmpty()
  @IsString()
  @ApiProperty({
    description: SCHEMAS_TEXT.todo_create_request.createdAt.description,
    default: SCHEMAS_TEXT.todo_create_request.createdAt.default,
  })
  createdAt: string;

  @IsNotEmpty()
  @ApiProperty({
    description: SCHEMAS_TEXT.todo_create_request.userID.description,
    default: SCHEMAS_TEXT.todo_create_request.userID.default,
  })
  userID: string;
}
