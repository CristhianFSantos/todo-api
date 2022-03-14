import { ApiProperty } from '@nestjs/swagger';
import {
  IsBoolean,
  IsEmail,
  IsNotEmpty,
  IsString,
  MinLength,
} from 'class-validator';

export class SignUpRequestDTO {
  @IsNotEmpty()
  @IsString()
  @ApiProperty({
    description: "User's name",
    default: 'Cristhian Santos',
  })
  name: string;

  @IsNotEmpty()
  @IsEmail()
  @ApiProperty({
    description: "User's email",
    default: 'cristhian@todo.com',
  })
  email: string;

  @IsNotEmpty()
  @IsBoolean()
  @ApiProperty({
    description: "User's isAdmin",
    default: true,
  })
  admin: boolean;

  @IsNotEmpty()
  @MinLength(6)
  @IsString()
  @ApiProperty({
    description: "User's password",
    default: '12345678',
  })
  password: string;
}
