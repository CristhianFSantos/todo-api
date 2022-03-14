import { HttpStatus } from '@nestjs/common';
export interface IAuthResponse {
  userID?: number;
  massage: string;
  token?: string;
  HttpStatus: HttpStatus;
}
