import { ApiProperty } from '@nestjs/swagger';
import { IsEmail, IsNotEmpty, IsString, MinLength } from 'class-validator';

export class SignInRequestDTO {
  @IsNotEmpty()
  @IsEmail()
  @ApiProperty({
    description: "User's email",
    default: 'cristhian@todo.com',
  })
  email: string;

  @IsNotEmpty()
  @MinLength(6)
  @IsString()
  @ApiProperty({
    description: "User's password",
    default: '12345678',
  })
  password: string;
}

export class SignInResponseDTO {
  userID: number;
  email: string;
  name: string;
}
