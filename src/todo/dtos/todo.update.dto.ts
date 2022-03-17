import { ApiProperty } from '@nestjs/swagger';
import { IsBoolean, IsNotEmpty, IsNumber, IsString } from 'class-validator';

export class TodoUpdateRequestDTO {
  @IsNotEmpty()
  @IsString()
  @ApiProperty({
    description: "The todo's title",
    default: 'Learn Angular',
  })
  title: string;

  @IsNotEmpty()
  @IsString()
  @ApiProperty({
    description: "The todo's description",
    default: 'Learn Angular with NestJS',
  })
  description: string;

  @IsNotEmpty()
  @IsBoolean()
  @ApiProperty({
    description: "The todo's completed status",
    default: false,
  })
  completed: boolean;

  @IsNotEmpty()
  @IsString()
  @ApiProperty({
    description: "The todo's createdAt",
    default: '2020-06-01T00:00:00',
  })
  createdAt: string;

  @IsNotEmpty()
  @IsNumber()
  @ApiProperty({
    description: "User's id",
    default: 2,
  })
  userID: number;
}
