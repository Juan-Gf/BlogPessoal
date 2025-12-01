import { IsNotEmpty } from "class-validator"
import { ColdObservable } from "rxjs/internal/testing/ColdObservable"
import { Column, Entity, PrimaryGeneratedColumn, UpdateDateColumn } from "typeorm"


@Entity({ name: "tb_postagem" }) // Indicando que a classe é uma entidade/model
export class Postagem{ // Exportanto a Classe Postagem

    @PrimaryGeneratedColumn() // Cheve primaria e Auto Incremental
    id: number

    @IsNotEmpty() // Validando o objeto antes de criar no banco
    @Column({ length: 100, nullable: false }) // Tamanho do texto = 100 | Regra do MySQL - Not null
    titulo: string
    
    @IsNotEmpty() // Validando o objeto antes de criar no banco
    @Column({ length: 100, nullable: false }) // Tamanho do texto = 100 | Regra do MySQL - Not null
    texto: string

    @UpdateDateColumn() // O proprio banco realiza a criação da data, se atualizar ele substitui com a nova
    date: Date

}