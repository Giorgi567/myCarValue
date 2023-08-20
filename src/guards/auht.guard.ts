import { CanActivate, ExecutionContext } from '@nestjs/common';

export class authGuard implements CanActivate {
  canActivate(contnet: ExecutionContext) {
    const requuest = contnet.switchToHttp().getRequest();

    return requuest.session.userId;
  }
}
