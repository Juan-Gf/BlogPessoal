import { Injectable } from "@nestjs/common";
import { Repository } from "typeorm";
import { Postagem } from "../entities/postagem.entity";
import { InjectRepository } from "@nestjs/typeorm";

@Injectable() // Indica que a classe é de serviço e pode ser injetada em outras classes
export class PostagemService{

    // iniciando ferramentas para a classe de serviço
    constructor(
        @InjectRepository(Postagem) // Pode chamar os metodos de uma classe Repository
        private postagemRepository: Repository<Postagem>
    ){}

    async findAll(): Promise<Postagem[]>{
        return await this.postagemRepository.find()
    }

    
}