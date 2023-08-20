import {
  Controller,
  NotFoundException,
  UseInterceptors,
  ClassSerializerInterceptor,
  Session,
} from '@nestjs/common';
import { Post, Get, Put, Delete, Body, Param, Query } from '@nestjs/common';
import { createUserDTO } from './DTOS/create.user.DTO';
import { UsersService } from './users.service';
import { updateUserDTO } from './DTOS/update.user.dto';
import { serialize } from './MiddleWares/serialized.middleware';
import { getUserDTO } from './DTOS/get-user.dto';
import { authService } from './auth.service';
import { signInUserDTO } from './DTOS/signIn.user.dto';
import { currUser } from './decorators/currUserDecorator';
@serialize(getUserDTO)
@Controller('auth')
export class UsersController {
  constructor(
    private userService: UsersService,
    private authService: authService,
  ) {}

  @Post('/signUp')
  async signUp(@Body() Body: createUserDTO, @Session() Session: any) {
    const user = await this.authService.signUp(Body.email, Body.password);
    Session.userId = user.id;
    return user;
  }

  @Post('/signOut')
  async signOut(@Session() Session: any) {
    return (Session.userId = null);
  }

  // @Get('/getCurrUser')
  // async getMe(@Session() Session: any) {
  //   const user = await this.userService.findOne(Session.userId);
  //   if (!user) {
  //     throw new Error('User Not Logged In');
  //   }

  //   return user;
  // }

  @Get('/getCurrUser')
  async getMe(@currUser() user: any) {
    return user;
  }
  @Post('/signIn')
  async signIn(@Body() Body: signInUserDTO, @Session() Session: any) {
    const user = await this.authService.signIn(Body.email, Body.password);
    Session.userId = user[0].id;

    return user[0];
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
