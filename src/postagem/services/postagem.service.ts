import { HttpException, HttpStatus, Injectable } from "@nestjs/common";
import { ILike, Repository } from "typeorm";
import { Postagem } from "../entities/postagem.entity";
import { InjectRepository } from "@nestjs/typeorm";
import { waitForDebugger } from "inspector";
import { DeleteResult } from "typeorm/browser";
import { TemaService } from "../../tema/services/tema.service";

@Injectable() // Indica que a classe é de serviço e pode ser injetada em outras classes
export class PostagemService{

    // iniciando ferramentas para a classe de serviço
    constructor(
        @InjectRepository(Postagem) // Pode chamar os metodos de uma classe Repository
        private postagemRepository: Repository<Postagem>,
        private temaService: TemaService
    ){}

    // Procura todas as postagens
    async findAll(): Promise<Postagem[]>{
        return await this.postagemRepository.find({
            relations: {
                tema: true,
                usuario: true
            }
        })
    }

    async findById(id: number): Promise<Postagem>{
        const postagem = await this.postagemRepository.findOne({
            where: { 
                id 
            },
            relations: {
                tema: true,
                usuario: true
            }
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
            },
            relations: {
                tema: true,
                usuario: true
            }
        })
    }

    async createPost(postagem: Postagem): Promise<Postagem>{

        if(postagem.tema){

            let tema = await this.temaService.findById(postagem.tema.id)

            if(!tema){
                throw new HttpException("Tema não encontrado!", HttpStatus.NOT_FOUND)
            }

            return await this.postagemRepository.save(postagem)
        }

        return await this.postagemRepository.save(postagem)
    }

    async updatePost(postagem: Postagem): Promise<Postagem>{
        
        let buscaPostagem: Postagem = await this.findById(postagem.id)

        if(!buscaPostagem || !postagem.id){
            throw new HttpException("Postagem não encontrada!", HttpStatus.NOT_FOUND)
        }

        if(postagem.tema){
    
            let tema = await this.temaService.findById(postagem.tema.id)

            if(!tema){
                throw new HttpException("Tema não encontrado!", HttpStatus.NOT_FOUND) 
            }

            return await this.postagemRepository.save(postagem)
        }

        return await this.postagemRepository.save(postagem)
    }
    
    async delelePost(id: number): Promise<DeleteResult>{

        let buscaPostagem: Postagem = await this.findById(id)

        if(!buscaPostagem){
            throw new HttpException("Postagem não encontrada!", HttpStatus.NOT_FOUND) 
        }

        return await this.postagemRepository.delete(id)
    }
}