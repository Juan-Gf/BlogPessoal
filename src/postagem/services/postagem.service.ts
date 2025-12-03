import { HttpException, HttpStatus, Injectable } from "@nestjs/common";
import { ILike, Repository } from "typeorm";
import { Postagem } from "../entities/postagem.entity";
import { InjectRepository } from "@nestjs/typeorm";
import { waitForDebugger } from "inspector";
import { DeleteResult } from "typeorm/browser";

@Injectable() // Indica que a classe é de serviço e pode ser injetada em outras classes
export class PostagemService{

    // iniciando ferramentas para a classe de serviço
    constructor(
        @InjectRepository(Postagem) // Pode chamar os metodos de uma classe Repository
        private postagemRepository: Repository<Postagem>
    ){}

    // Procura todas as postagens
    async findAll(): Promise<Postagem[]>{
        return await this.postagemRepository.find()
    }

    async findById(id: number): Promise<Postagem>{
        const postagem = await this.postagemRepository.findOne({
            where: { id }
        })
        
        if(!postagem) {
            throw new HttpException("Postagem não encontrada", HttpStatus.NOT_FOUND)
        }

        return postagem
    }

    async findByTitle(titulo: string): Promise<Postagem[]> {
        return await this.postagemRepository.find({
            where: {
                titulo: ILike(`%${titulo}%`)
            }
        })
    }

    async createPost(postagem: Postagem): Promise<Postagem>{
        return await this.postagemRepository.save(postagem)
    }

    async updatePost(postagem: Postagem): Promise<Postagem>{
        
        await this.findById(postagem.id)

        return await this.postagemRepository.save(postagem)
    }
    
    async delelePost(id: number): Promise<DeleteResult>{

        await this.findById(id)

        return await this.postagemRepository.delete(id)
    }
}