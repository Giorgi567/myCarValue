import { IsEmail, isString, IsOptional, IsString } from 'class-validator';

export class updateUserDTO {
  @IsEmail()
  @IsOptional()
  email: string;

  @IsString()
  @IsOptional()
  password: string;
}
