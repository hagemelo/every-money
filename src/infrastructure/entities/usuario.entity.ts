import { UsuarioDomain } from "@domain/usuario.domain";
import { Column, CreateDateColumn, Entity, OneToMany, PrimaryGeneratedColumn, Relation, UpdateDateColumn } from "typeorm";
import { ContaEntity } from "./conta.entity";
import { EveryMoneyEntity } from "@domain/every-money.entity";
import { CategoriaEntity } from "./categoria.entity";

type UsuarioProps = {
    id?: number;
    nome: string;
    email: string;
    senha?: string;
    createdAt?: Date;
    updatedAt?: Date;
    contas?: ContaEntity[]
    categorias?: CategoriaEntity[]
}


@Entity('usuario_tb')
export class UsuarioEntity extends EveryMoneyEntity {

    constructor(props?: UsuarioProps){
        super()
        if(props){
            this.id = props.id
            this.nome = props.nome
            this.email = props.email
            this.senha = props.senha
            this.createdAt = props.createdAt
            this.updatedAt = props.updatedAt
            this.contas = props.contas
            this.categorias = props.categorias
        }

    }

    @PrimaryGeneratedColumn({name: 'usuario_id'})
    id: number;
	
    @Column()
    nome: string;

    @Column()
    email: string;
    
    @Column({ select: false })
	senha: string;

    @CreateDateColumn({ name: 'created_at' })
    createdAt: Date;
    
    @UpdateDateColumn({ name: 'updated_at' })
    updatedAt: Date;
    
    @OneToMany(() => ContaEntity, (conta) => conta.usuario)
    contas: ContaEntity[]

    @OneToMany(() => CategoriaEntity, (categoria) => categoria.usuario)
    categorias: Relation<CategoriaEntity[]>

    static fromDomain(usuarioDomain: UsuarioDomain): UsuarioEntity {
        const contas = usuarioDomain.contas?.map(conta => ContaEntity.fromDomain(conta))
        const categorias = usuarioDomain.categorias?.map(categoria => CategoriaEntity.fromDomain(categoria))
        const entity = new UsuarioEntity({...usuarioDomain.toModel(), contas, categorias})
        return entity;
    }
    
    toDomain(): UsuarioDomain {

        const usuario = {
            ...this,
            contas: this.contas?.map(conta => conta.toDomain()),
            categorias: this.categorias?.map(categoria => categoria.toDomain())
        };
        return new UsuarioDomain(usuario);
    }
}