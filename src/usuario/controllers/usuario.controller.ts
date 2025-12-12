import { Body, Controller, Delete, Get, HttpCode, HttpStatus, Param, ParseIntPipe, Post, Put, UseGuards } from "@nestjs/common";
import { UsuarioService } from "../services/usuario.service";
import { Usuario } from "../entities/usuario.entity";
import { DeleteResult } from "typeorm";
import { JwtAuthGuard } from "../../auth/guard/jwt-auth.guard";

@Controller("/usuarios")
export class UsuarioController{
    
    constructor( 
        private readonly usuarioService: UsuarioService
    ){}

    @UseGuards(JwtAuthGuard)
    @Get("/all")
    @HttpCode(HttpStatus.OK)
    findAll():Promise<Usuario[]>{
        return this.usuarioService.findAll()
    }

    @UseGuards(JwtAuthGuard)
    @Get("/:id")
    @HttpCode(HttpStatus.OK)
    findById(@Param ("id",ParseIntPipe) id: number): Promise<Usuario>{
        return this.usuarioService.findById(id)
    }

    @UseGuards(JwtAuthGuard)
    @Get("/usuario/:usuario")
    @HttpCode(HttpStatus.OK)
    findByUsuario(@Param("usuario") usuario: string): Promise<Usuario | null>{
        return this.usuarioService.findByUsuario(usuario)
    }

    // Essa rota estará desprotegida de JWT
    @Post("/:cadastar")
    @HttpCode(HttpStatus.CREATED)
    createUsuario(@Body() usuario: Usuario): Promise<Usuario>{
        return this.usuarioService.createUsuario(usuario)
    }

    @UseGuards(JwtAuthGuard)
    @Put("/:atualizar")
    @HttpCode(HttpStatus.OK)
    updateUsuario(@Body() usuario: Usuario): Promise<Usuario>{
        return this.usuarioService.updateUsuario(usuario)
    }

    @UseGuards(JwtAuthGuard)
    @Delete("/:id")
    @HttpCode(HttpStatus.NO_CONTENT)
    deleteUsuario(@Param("id", ParseIntPipe) id: number): Promise<DeleteResult>{
        return this.usuarioService.deleteUsuario(id)
    }

}