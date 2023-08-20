import {
  NestInterceptor,
  ExecutionContext,
  Injectable,
  CallHandler,
} from '@nestjs/common';
import { UsersService } from '../users.service';

@Injectable()
export class currUserInterceptor implements NestInterceptor {
  constructor(private UserService: UsersService) {}

  async intercept(context: ExecutionContext, next: CallHandler) {
    const request = context.switchToHttp().getRequest();
    const { userId } = request.session;

    if (userId) {
      const user = this.UserService.findOne(userId);
      request.currUser = user;
    }

    return next.handle();
  }
}
