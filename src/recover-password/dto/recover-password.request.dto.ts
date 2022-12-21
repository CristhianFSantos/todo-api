import { IsEmail, IsNotEmpty, IsString, Length } from 'class-validator';
export class RecoverPasswordRequestDTO {
  @IsNotEmpty()
  @IsString()
  @IsEmail()
  email: string;
  @IsNotEmpty()
  @Length(6, 6)
  code: string;

  @IsNotEmpty()
  @IsString()
  @Length(8, 20)
  newPassword: string;
}
