import { IsNotEmpty } from "class-validator"
import { Column, Entity, ManyToOne, PrimaryGeneratedColumn, UpdateDateColumn } from "typeorm"
import { Tema } from "../../tema/entities/tema.entity"
import { Usuario } from "../../usuario/entities/usuario.entity"



@Entity({ name: "tb_postagem" }) // Indicando que a classe é uma entidade/model
export class Postagem{ // Exportanto a Classe Postagem

    @PrimaryGeneratedColumn() // Cheve primaria e Auto Incremental
    id: number

    @IsNotEmpty() // Validando o objeto antes de criar no banco
    @Column({ length: 255, nullable: false }) // Tamanho do texto = 100 | Regra do MySQL - Not null
    titulo: string
    
    @IsNotEmpty() // Validando o objeto antes de criar no banco
    @Column({ length: 255, nullable: false }) // Tamanho do texto = 100 | Regra do MySQL - Not null
    texto: string

    @UpdateDateColumn() // O proprio banco realiza a criação da data, se atualizar ele substitui com a nova
    date: Date

    @ManyToOne(() => Tema, (tema) => tema.postagem,{
       onDelete: "CASCADE"
    })
    tema: Tema

    @ManyToOne(() => Usuario, (usuario) => usuario.postagem,{
        onDelete: "CASCADE"
    })
    usuario: Usuario
}