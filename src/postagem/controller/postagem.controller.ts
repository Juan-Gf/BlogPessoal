import { Body, Controller, Delete, Get, HttpCode, HttpStatus, Param, ParseIntPipe, Post, Put } from "@nestjs/common";
import { PostagemService } from "../services/postagem.service";
import { Postagem } from "../entities/postagem.entity";
import { promises } from "dns";
import { DeleteResult } from "typeorm";
import { TemaService } from "../../tema/services/tema.service";

@Controller("/postagens") // Indica que essa classe é uma Controller
export class PostagemController {

    constructor(
        private readonly postagemService: PostagemService) {}

    @Get() // Indica qual tipo de requisição esse metodo é executado - GET
    @HttpCode(HttpStatus.OK) // Monta a resposta do HTTP para o Front com o status 200
    findAll(): Promise<Postagem[]> {
        return this.postagemService.findAll()
    }

    @Get("/:id") // Indica qual tipo de requisição esse metodo é executado - GET
    @HttpCode(HttpStatus.OK) // Monta a resposta do HTTP para o Front com o status 200
    findById(@Param("id", ParseIntPipe) id: number): Promise<Postagem> {       
        return this.postagemService.findById(id)
    }

    @Get("/titulo/:titulo_conteudo") // GET - /titulo(determina a coluna da tabela)/:titulo_conteudo(texto para pesquisa nas postagens)
    @HttpCode(HttpStatus.OK) // Monta a resposta do HTTP para o Front com o status 200
    findByTitle(@Param('titulo_conteudo') titulo_conteudo: string): Promise<Postagem[]>{
        return this.postagemService.findByTitle(titulo_conteudo)
    }

    @Post() // Indica qual tipo de requisição esse metodo é executado - POST (Cadastrar)
    @HttpCode(HttpStatus.CREATED)
    createPost(@Body() postagem: Postagem): Promise<Postagem>{
        return this.postagemService.createPost(postagem)
    }

    @Put()
    @HttpCode(HttpStatus.OK)
    updatePost(@Body() postagem: Postagem): Promise<Postagem>{
        return this.postagemService.updatePost(postagem)
    }

    @Delete("/:id_post")
    @HttpCode(HttpStatus.NO_CONTENT)
    deletePost(@Param("id_post", ParseIntPipe) id_post: number): Promise<DeleteResult>{
        return this.postagemService.delelePost(id_post)
    }    


}