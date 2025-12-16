import { Post } from "@nestjs/common";
import { IsEmail, IsNotEmpty, MinLength } from "class-validator";
import { Column, Entity, OneToMany, PrimaryGeneratedColumn } from "typeorm";
import { Postagem } from "../../postagem/entities/postagem.entity";
import { ApiProperty } from "@nestjs/swagger";


@Entity({name: "tb_usuario"}) // Indicando que a classe é uma Entitidade/Model
export class Usuario{

    @PrimaryGeneratedColumn()
    id: number

    @IsNotEmpty()
    @Column({length: 255, nullable: false})
    @ApiProperty()
    nome: string

    @IsEmail() //Valida que a informação é um e-mail
    @IsNotEmpty()
    @Column({length: 255, nullable: false})
    @ApiProperty({example: "email@email.com.br"})
    usuario: string

    @MinLength(8) // Determina que o minimo da senha são 8 cacteres
    @IsNotEmpty()
    @Column({length: 255, nullable: false})
    @ApiProperty()
    senha: string

    @IsNotEmpty()
    @Column({length: 5000})
    @ApiProperty()
    foto: string

    @ApiProperty()
    @OneToMany(() => Postagem, (postagem) => postagem.usuario) // Indica o lado UM do relacionamento, indicando que esse campo se conecta ao campo Usuario da Model Postagem
    postagem: Postagem[]

}