import { ApiProperty } from '@nestjs/swagger';
import { IsEmail, IsNotEmpty, IsString, MinLength } from 'class-validator';
import { SCHEMAS_TEXT } from 'src/swagger/swagger.schemas.text';

export class SignInRequestDTO {
  @IsNotEmpty()
  @IsEmail()
  @ApiProperty({
    description: SCHEMAS_TEXT.sign_in.email.description,
    default: SCHEMAS_TEXT.sign_in.email.default,
  })
  email: string;

  @IsNotEmpty()
  @MinLength(8)
  @IsString()
  @ApiProperty({
    description: SCHEMAS_TEXT.sign_in.password.description,
    default: SCHEMAS_TEXT.sign_in.password.default,
  })
  password: string;
}
