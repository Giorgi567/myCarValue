import { Controller } from '@nestjs/common';
import { Post, Get, Put, Delete, Body, Param } from '@nestjs/common';
import { createUserDTO } from './DTOS/create.user.DTO';
@Controller('auth')
export class UsersController {
  @Post('/signup')
  async signUp(@Body() Body: createUserDTO) {}
}
