import { IsString, IsEmail, IsStrongPassword } from 'class-validator';

export class createUserDTO {
  @IsEmail()
  email: string;

  @IsString()
  password: string;
}
