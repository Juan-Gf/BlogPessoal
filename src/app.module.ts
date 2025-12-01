import { Module } from '@nestjs/common';
import { TypeOrmModule } from '@nestjs/typeorm';
import { Postagem } from './postagem/entities/postagem.entity';
import { PostagemModule } from './postagem/postagem.module';

// Decorator - Etiqueta de Meta dados
@Module({
  imports: [ // Configurando o TypeORM  
    TypeOrmModule.forRoot({
      type: 'mysql',
      host: 'localhost',
      port: 3306,
      username: 'root',
      password: 'root',
      database: 'db_blogpessoal',
      entities: [Postagem],
      synchronize: true,
    }),
    PostagemModule
  ],
  controllers: [],
  providers: [],
})

// Exportando a classe AppModule
export class AppModule {}
