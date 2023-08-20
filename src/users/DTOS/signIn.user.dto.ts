import { IsString, IsEmail } from 'class-validator';

export class signInUserDTO {
  @IsEmail()
  email: string;

  @IsString()
  password: string;
}
