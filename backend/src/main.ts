import { NestFactory } from '@nestjs/core';
import { AppModule } from './app.module';
import { ValidationPipe } from '@nestjs/common';

async function bootstrap() {
  const app = await NestFactory.create(AppModule);
  //ValidationPipeによってDTOのバリデーションを自動で行う
  app.useGlobalPipes(new ValidationPipe());
  app.enableCors(); // この行を追加
  await app.listen(process.env.PORT ?? 3005);
}
bootstrap();
