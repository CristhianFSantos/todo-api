import { ApiProperty } from '@nestjs/swagger';
import { IsBoolean, IsNotEmpty, IsNumber, IsString } from 'class-validator';

export class CreateTodoRequestDTO {
  @IsNotEmpty()
  @IsString()
  @ApiProperty({
    description: "Todo's title",
    default: 'Learn NestJS',
  })
  title: string;

  @IsNotEmpty()
  @IsBoolean()
  @ApiProperty({
    description: "Todo's completed",
    default: true,
  })
  completed: boolean;

  @IsNotEmpty()
  @IsString()
  @ApiProperty({
    description: "Todo's description",
    default: 'Create application with NestJS, Prisma, Postgres and Docker',
  })
  description: string;

  @IsNotEmpty()
  @IsString()
  @ApiProperty({
    description: "Todo's createdAt",
    default: '2020-06-01T00:00:00',
  })
  createdAt: string;

  @IsNotEmpty()
  @IsNumber()
  @ApiProperty({
    description: "User's id",
    default: 1,
  })
  userID: number;
}
