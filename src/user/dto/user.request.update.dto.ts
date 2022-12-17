import { ApiProperty } from '@nestjs/swagger';
import { IsEmail, IsNotEmpty, IsString } from 'class-validator';
import { SCHEMAS_TEXT } from 'src/swagger/swagger.schemas.text';

export class UserRequestUpdateDTO {
  @IsNotEmpty()
  @IsString()
  @ApiProperty({
    description: SCHEMAS_TEXT.user_request_update.name.description,
    default: SCHEMAS_TEXT.user_request_update.name.default,
  })
  name: string;

  @IsNotEmpty()
  @IsEmail()
  @ApiProperty({
    description: SCHEMAS_TEXT.user_request_update.email.description,
    default: SCHEMAS_TEXT.user_request_update.email.default,
  })
  email: string;
}
