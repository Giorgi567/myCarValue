import { Module } from '@nestjs/common';
import { UsersController } from './users.controller';
import { UsersService } from './users.service';
import { TypeOrmModule } from '@nestjs/typeorm';
import { UserEntity } from './users.entity';
import { authService } from './auth.service';
import { currUserInterceptor } from './interceptors/userInterceptor';
import { APP_INTERCEPTOR } from '@nestjs/core';
@Module({
  imports: [TypeOrmModule.forFeature([UserEntity])],
  controllers: [UsersController],
  providers: [
    UsersService,
    authService,
    {
      provide: APP_INTERCEPTOR,
      useClass: currUserInterceptor,
    },
  ],
})
export class UsersModule {}
