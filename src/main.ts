import { ValidationPipe } from '@nestjs/common';
import { NestFactory } from '@nestjs/core';
import { AppModule } from './app.module';

async function bootstrap() {
  const app = await NestFactory.create(AppModule);

  //Ajusta a data e hora para considir com BD
  process.env.TZ = '-03:00'

  // Valida as requisições feitas a API
  app.useGlobalPipes(new ValidationPipe())

  // Habilitando o CORS do projeto
  app.enableCors()

  
  await app.listen(process.env.PORT ?? 4000);
}
bootstrap();
