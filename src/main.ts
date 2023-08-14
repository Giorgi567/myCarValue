import { NestFactory } from '@nestjs/core';
import { AppModule } from './app.module';
import { ValidationPipe } from '@nestjs/common';
async function bootstrap() {
  const app = await NestFactory.create(AppModule);
  app.useGlobalPipes(
    new ValidationPipe({
      whitelist: true, //this parameter removes extra parameters that are not part of DTO so that none can mess with our database by chaining their role from user to admin
    }),
  );
  await app.listen(3000);
}
bootstrap();
