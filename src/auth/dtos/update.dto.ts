import { ApiProperty } from '@nestjs/swagger';
import { IsBoolean, IsEmail, IsNotEmpty, IsString } from 'class-validator';

export class UpdateRequestDTO {
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

  @IsNotEmpty()
  @IsBoolean()
  @ApiProperty({
    description: "User's admin",
    default: false,
  })
  admin: boolean;
}
