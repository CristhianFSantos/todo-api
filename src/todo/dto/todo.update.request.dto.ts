import { ApiProperty } from '@nestjs/swagger';
import { IsBoolean, IsNotEmpty, IsString } from 'class-validator';
import { SCHEMAS_TEXT } from 'src/swagger/swagger.schemas.text';

export class TodoUpdateRequestDTO {
  @IsNotEmpty()
  @IsString()
  @ApiProperty({
    description: SCHEMAS_TEXT.todo_update_request.title.description,
    default: SCHEMAS_TEXT.todo_update_request.title.default,
  })
  title: string;

  @IsNotEmpty()
  @IsString()
  @ApiProperty({
    description: SCHEMAS_TEXT.todo_update_request.description.description,
    default: SCHEMAS_TEXT.todo_update_request.description.default,
  })
  description: string;

  @IsNotEmpty()
  @IsBoolean()
  @ApiProperty({
    description: SCHEMAS_TEXT.todo_update_request.completed.description,
    default: SCHEMAS_TEXT.todo_update_request.completed.default,
  })
  completed: boolean;

  @IsNotEmpty()
  @IsString()
  @ApiProperty({
    description: SCHEMAS_TEXT.todo_update_request.createdAt.description,
    default: SCHEMAS_TEXT.todo_update_request.createdAt.default,
  })
  createdAt: string;

  @IsNotEmpty()
  @ApiProperty({
    description: SCHEMAS_TEXT.todo_update_request.userID.description,
    default: SCHEMAS_TEXT.todo_update_request.userID.default,
  })
  userID: string;
}
