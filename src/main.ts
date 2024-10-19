/* eslint-disable prettier/prettier */
import { NestFactory } from '@nestjs/core';
import { AppModule } from './app.module';
import { ValidationPipe } from '@nestjs/common';
import { transformInterceptor } from './auth/transformer.intercepetor';

async function bootstrap() {
  const app = await NestFactory.create(AppModule);
  app.useGlobalPipes(new ValidationPipe())
  app.useGlobalInterceptors(new transformInterceptor)
    app.enableCors({
       origin:'http://localhost:8080'
    });
   await app.listen(3000);
}
bootstrap();
