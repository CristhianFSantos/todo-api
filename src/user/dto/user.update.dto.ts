import { ApiProperty } from '@nestjs/swagger';
import { IsEmail, IsNotEmpty, IsString } from 'class-validator';

export class UserUpdateRequestDTO {
  @IsNotEmpty()
  @IsString()
  @ApiProperty({
    description: "User's name",
    default: 'Cristhian Felipe',
  })
  name: string;

  @IsNotEmpty()
  @IsEmail()
  @ApiProperty({
    description: "User's email",
    default: 'felipe@todo.com',
  })
  email: string;
}
