import { Body, Controller, Delete, Get, HttpCode, HttpStatus, Param, ParseIntPipe, Post, Put, UseGuards } from "@nestjs/common";
import { Tema } from "../entities/tema.entity";
import { TemaService } from "../services/tema.service";
import { JwtAuthGuard } from "../../auth/guard/jwt-auth.guard";
import { ApiBearerAuth, ApiTags } from "@nestjs/swagger";

@ApiTags("Tema")
@UseGuards(JwtAuthGuard)
@Controller("/tema")
@ApiBearerAuth()
export class TemaController {

    constructor(private readonly temaService: TemaService){}

    @Get()
    @HttpCode(HttpStatus.OK)
    findAll(): Promise<Tema[]>{
        return this.temaService.findAll()
    }

    @Get("/:id")
    @HttpCode(HttpStatus.OK)
    findById(@Param("id", ParseIntPipe) id: number): Promise<Tema>{
        return this.temaService.findById(id)
    }

    @Get("/descricao/:descricao_conteudo")
    @HttpCode(HttpStatus.OK)
    findByDescricao(@Param("descricao_conteudo") descricao_conteudo: string): Promise<Tema[]>{
        return this.temaService.findByDescricao(descricao_conteudo)
    }

    @Post()
    @HttpCode(HttpStatus.CREATED)
    createTema(@Body() tema: Tema): Promise<Tema>{
        return this.temaService.createTema(tema)
    }

    @Put()
    @HttpCode(HttpStatus.OK)
    updateTema(@Body() tema: Tema): Promise<Tema>{
        return this.temaService.updateTema(tema)
    }

    @Delete('/:id')
    @HttpCode(HttpStatus.NO_CONTENT)
    deleteTema(@Param('id', ParseIntPipe) id: number){
        return this.temaService.deleteTema(id);
    }



}