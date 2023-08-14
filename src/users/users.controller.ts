import { Controller } from '@nestjs/common';
import { Post, Get, Put, Delete, Body, Param } from '@nestjs/common';
import { createUserDTO } from './DTOS/create.user.DTO';
import { UsersService } from './users.service';
@Controller('auth')
export class UsersController {
  constructor(private userService: UsersService) {}

  @Post('/signUp')
  async signUp(@Body() Body: createUserDTO) {
    return this.userService.create(Body.email, Body.password);
  }
}
