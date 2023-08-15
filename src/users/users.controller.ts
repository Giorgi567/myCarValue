import {
  Controller,
  NotFoundException,
  UseInterceptors,
  ClassSerializerInterceptor,
} from '@nestjs/common';
import { Post, Get, Put, Delete, Body, Param, Query } from '@nestjs/common';
import { createUserDTO } from './DTOS/create.user.DTO';
import { UsersService } from './users.service';
import { updateUserDTO } from './DTOS/update.user.dto';
import { serialize } from './MiddleWares/serialized.middleware';
import { getUserDTO } from './DTOS/get-user.dto';
@serialize(getUserDTO)
@Controller('auth')
export class UsersController {
  constructor(private userService: UsersService) {}

  @Post('/signUp')
  async signUp(@Body() Body: createUserDTO) {
    return this.userService.create(Body.email, Body.password);
  }

  @Get('getUsers')
  async getAllUsers() {
    return this.userService.findAllUsers();
  }
  @Get('')
  async getUsers(@Query('email') email: string) {
    return this.userService.find(email);
  }

  @Get('/:id')
  async getUser(@Param('id') id: string) {
    const user = await this.userService.findOne(id);
    if (!user) {
      throw new NotFoundException('User not Found');
    }
    return user;
  }

  @Put('/:id')
  async updateUser(@Param('id') id: string, @Body() Body: updateUserDTO) {
    return this.userService.update(+id, Body);
  }

  @Delete('/:id')
  async deleteUser(@Param('id') id: string) {
    return this.userService.remove(+id);
  }
}
