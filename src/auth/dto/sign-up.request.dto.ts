import { ApiProperty } from '@nestjs/swagger';
import { IsEmail, IsNotEmpty, IsString, MinLength } from 'class-validator';
import { SCHEMAS_TEXT } from 'src/swagger/swagger.schemas.text';

export class SignUpRequestDTO {
  @IsNotEmpty()
  @IsString()
  @MinLength(3)
  @ApiProperty({
    description: SCHEMAS_TEXT.sign_up.name.description,
    default: SCHEMAS_TEXT.sign_up.name.default,
  })
  name: string;

  @IsNotEmpty()
  @IsEmail()
  @ApiProperty({
    description: SCHEMAS_TEXT.sign_up.email.description,
    default: SCHEMAS_TEXT.sign_up.email.default,
  })
  email: string;

  @IsNotEmpty()
  @MinLength(6)
  @IsString()
  @ApiProperty({
    description: SCHEMAS_TEXT.sign_up.password.description,
    default: SCHEMAS_TEXT.sign_up.password.default,
  })
  password: string;
}
