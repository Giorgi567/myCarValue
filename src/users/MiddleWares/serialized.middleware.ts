import {
  UseInterceptors,
  NestInterceptor,
  ExecutionContext,
  CallHandler,
} from '@nestjs/common';

import { Observable } from 'rxjs';
import { map } from 'rxjs/operators';
import { plainToClass } from 'class-transformer';

interface classConstructor {
  new (...args: any[]): {};
}

export function serialize(dto: classConstructor) {
  return UseInterceptors(new serializedMiddlewar(dto));
}
export class serializedMiddlewar implements NestInterceptor {
  constructor(private DTO: any) {}
  intercept(context: ExecutionContext, next: CallHandler): Observable<any> {
    return next.handle().pipe(
      map((data: any) => {
        return plainToClass(this.DTO, data, {
          excludeExtraneousValues: true,
        });
      }),
    );
  }
}
