import { Body, Controller, Delete, Get, HttpCode, HttpStatus, Param, ParseIntPipe, Post, Put, UseGuards } from "@nestjs/common";
import { PostagemService } from "../services/postagem.service";
import { Postagem } from "../entities/postagem.entity";
import { DeleteResult } from "typeorm";
import { JwtAuthGuard } from "../../auth/guard/jwt-auth.guard";
import { ApiBearerAuth, ApiTags } from "@nestjs/swagger";

@ApiTags('Postagem')
@UseGuards(JwtAuthGuard)  // Colocando essa Anotação aqui, indica que todos os endpoints são protegidos
@Controller("/postagens") // Indica que essa classe é uma Controller
@ApiBearerAuth()
export class PostagemController {

    constructor(
        private readonly postagemService: PostagemService) {}

    @Get() // Indica qual tipo de requisição esse metodo é executado - GET
    @HttpCode(HttpStatus.OK) // Monta a resposta do HTTP para o Front com o status 200
    findAll(): Promise<Postagem[]> {
        return this.postagemService.findAll()
    }

    // @Get("/:id_post") Indica que esse método lida com Requisições do Tipo GET e que no seu endpoint será enviado um id como parametro
    // @Param captura o paramêtro envia pelo endpoint e o atribui ao parametro do método findById(id:number)
    // ParseIntPipe converte o parametro do endpoint de string para int. Ex: id: '1' => id: 1
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

    // @Put() Indica que esse método lida com Requisições do Tipo Put
    // @Body() Captura/Extrai o objeto que vem pelo Corpo da Requisição e passa para parametro do método 
    @Put()// Usado quando queremos Atualizar alguma informação
    @HttpCode(HttpStatus.OK)
    updatePost(@Body() postagem: Postagem): Promise<Postagem>{
        return this.postagemService.updatePost(postagem)
    }

    // @Delete('/:ID') Indica que esse método lida com Requisições do Tipo DELETE e que no seu endpoint será enviado um id como parametro
    // @Param captura o paramêtro envia pelo endpoint e o atribui ao parametro do método delete(id:number)
    // ParseIntPipe converte o parametro do endpoint de string para int. Ex: id: '1' => id: 1    @Delete("/:id")
    @Delete('/:id')
    @HttpCode(HttpStatus.NO_CONTENT)
    deletePost(@Param("id", ParseIntPipe) id: number): Promise<DeleteResult>{
        return this.postagemService.delelePost(id)
    }    


}