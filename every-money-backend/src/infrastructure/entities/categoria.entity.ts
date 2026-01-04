import { ClassificacaoCategoriaModel } from "@domain/models/classificacao-categoria.model";
import { TipoCategoriaModel } from "@domain/models/tipo-categoria.model";
import { Column, CreateDateColumn, Entity, JoinColumn, ManyToOne, OneToMany, PrimaryGeneratedColumn, Relation, UpdateDateColumn } from "typeorm"
import { TransacaoEntity } from "./transacao.entity";
import { CategoriaDomain } from "@domain/categoria.domain";
import { EveryMoneyEntity } from "@domain/every-money.entity";
import { UsuarioEntity } from "./usuario.entity";


type ContaProps = {
    id?: number;
    nome: string;
    tipo: TipoCategoriaModel;
    classificacao: ClassificacaoCategoriaModel;
    createdAt?: Date;
    updatedAt?: Date;
    transacoes?: TransacaoEntity[];
    usuario: UsuarioEntity;
}

@Entity('categoria_tb')
export class CategoriaEntity extends EveryMoneyEntity{


constructor(props?: ContaProps){
        super()
        if(props){
            this.id = props.id
            this.nome = props.nome
            this.tipo = props.tipo
            this.classificacao = props.classificacao
            this.createdAt = props.createdAt
            this.updatedAt = props.updatedAt
            this.transacoes = props.transacoes
            this.usuario = props.usuario
        }
    }

    @PrimaryGeneratedColumn({name: 'categoria_id'})
    id: number

    @Column()
    nome: string

    @Column({
    type: 'varchar', name: 'tipo', enum: TipoCategoriaModel, default: TipoCategoriaModel.Saida
    })
    tipo: TipoCategoriaModel;

    @Column({
    type: 'varchar', name: 'classificacao', enum: ClassificacaoCategoriaModel, default: ClassificacaoCategoriaModel.OutrosGastos
    })
    classificacao: ClassificacaoCategoriaModel;

    @CreateDateColumn({ name: 'created_at' })
    createdAt: Date;
    
    @UpdateDateColumn({ name: 'updated_at' })
    updatedAt: Date;

    @OneToMany(() => TransacaoEntity, (transacao) => transacao.categoria)
    transacoes: Relation<TransacaoEntity[]>

    @ManyToOne(() => UsuarioEntity, (usuario) => usuario.categorias)
    @JoinColumn({ name: 'usuario_id' })
    usuario: Relation<UsuarioEntity>
    
    static fromDomain(categoriaDomain: CategoriaDomain): CategoriaEntity {     
        const usuario = UsuarioEntity.fromDomain(categoriaDomain.usuario)
        const transacoes = categoriaDomain.transacoes?.map(transacao => TransacaoEntity.fromDomain(transacao))
        const entity = new CategoriaEntity({...categoriaDomain.toModel(), usuario, transacoes});
        return entity;
    }

    toDomain(): CategoriaDomain {
        const categoria = {
            ...this,
            transacoes: this.transacoes?.map(transacao => transacao.toDomain()),
            usuario: this.usuario?.toDomain()
        };
        return new CategoriaDomain(categoria);
    }

}