import { ValidationPipe } from '@nestjs/common';
import { NestFactory } from '@nestjs/core';
import { AppModule } from './app.module';
import { DocumentBuilder, SwaggerModule } from '@nestjs/swagger';

async function bootstrap() {
  const app = await NestFactory.create(AppModule);

  const config = new DocumentBuilder()
  .setTitle('Blog Pessoal')
  .setDescription('Projeto Blog Pessoal')
  .setContact("Generation Brasil","http://www.generationbrasil.online","generation@email.com")
  .setVersion('1.0')
  .addBearerAuth()
  .build();
  const document = SwaggerModule.createDocument(app, config);
  SwaggerModule.setup('/swagger', app, document);

  //Ajusta a data e hora para considir com BD
  process.env.TZ = '-03:00'

  // Valida as requisições feitas a API
  app.useGlobalPipes(new ValidationPipe())

  // Habilitando o CORS do projeto
  app.enableCors()

  
  await app.listen(process.env.PORT ?? 4000);
}
bootstrap();
