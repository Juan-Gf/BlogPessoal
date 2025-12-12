import { HttpException, HttpStatus, Injectable } from "@nestjs/common";
import { Usuario } from "../entities/usuario.entity";
import { DeleteResult, ILike, Repository } from "typeorm";
import { InjectRepository } from "@nestjs/typeorm";
import { Bcrypt } from "../../auth/bcrypt/bcrypt";


@Injectable()
export class UsuarioService{

   
    constructor(
         @InjectRepository(Usuario)
        private usuarioRepository: Repository<Usuario>,
        private bcrypt: Bcrypt // Dentro do Construtor injetamos o arquivo BCRYPT para podermos usar seus métodos
    ){}

    async findAll(): Promise<Usuario[]>{
        return await this.usuarioRepository.find()
    }

    async findById(id: number): Promise<Usuario>{

        let usuario = await this.usuarioRepository.findOne({
            where: { id }
        })

        if(!usuario){
            throw new HttpException("Usuario não encontrado", HttpStatus.NOT_FOUND)
        }

        return usuario

    }

    async findByUsuario(usuario: string): Promise<Usuario | null>{

        return await this.usuarioRepository.findOne({
            where: { 
                usuario: ILike(`%${usuario}%`)
            }
        })

    }

    async createUsuario(usuario: Usuario): Promise<Usuario>{

        let buscaUsuario = await this.findByUsuario(usuario.usuario)

        if(!buscaUsuario){ // Se o usuario não existe na base

            // Antes de cadastrar o usuario chamamos a função de Criptografia construída no arquivo bcrypt
            usuario.senha = await this.bcrypt.criptografarSenha(usuario.senha)

            return await this.usuarioRepository.save(usuario)
        }

        throw new HttpException("O Usuário ja existe!", HttpStatus.BAD_REQUEST);

    }

    async updateUsuario(usuario: Usuario): Promise<Usuario>{

        let usuarioUpdate: Usuario = await this.findById(usuario.id) // Função para localizar o usuario pelo ID
        let buscaUsuario = await this.findByUsuario(usuario.usuario) // Função para localizar o usuario pelo email

        if(!usuarioUpdate){  // Se o usuario não existe na base
            throw new HttpException("Usuario não encontrado", HttpStatus.NOT_FOUND)
        }

        if(buscaUsuario && buscaUsuario.id !== usuario.id){ // Verifica se o usuario (email) ja estão cadastrados
            throw new HttpException('Usuário (e-mail) já Cadastrado, digite outro!', HttpStatus.BAD_REQUEST);
        }

         // Antes de cadastrar o usuario chamamos a função de Criptografia construída no arquivo bcrypt
        usuario.senha = await this.bcrypt.criptografarSenha(usuario.senha)

        return await this.usuarioRepository.save(usuario)
    }

    async deleteUsuario(id: number): Promise<DeleteResult>{

        let buscaUsuario = await this.findById(id)

        if(!buscaUsuario){
            throw new HttpException("Usuario não encontrado", HttpStatus.NOT_FOUND)
        }

        return this.usuarioRepository.delete(id)

    }


}