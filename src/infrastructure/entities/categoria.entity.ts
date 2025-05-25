import { ClassificacaoCategoriaModel } from "@domain/models/classificacao-categoria.model";
import { TipoCategoriaModel } from "@domain/models/tipo-categoria.model";
import { Column, Entity, JoinColumn, ManyToOne, OneToMany, PrimaryGeneratedColumn, Relation } from "typeorm"
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

    @Column({name: 'categoria_id'})
    @PrimaryGeneratedColumn()
    id: number

    @Column()
    nome: string

    @Column({
    type: 'enum', name: 'tipo', enum: TipoCategoriaModel, default: TipoCategoriaModel.Outros
    })
    tipo: TipoCategoriaModel;

    @Column({
    type: 'enum', name: 'classificacao', enum: ClassificacaoCategoriaModel, default: ClassificacaoCategoriaModel.OutrosGastos
    })
    classificacao: ClassificacaoCategoriaModel;

    @Column()
    createdAt: Date;
    
    @Column()
    updatedAt: Date;

    @OneToMany(() => TransacaoEntity, (transacao) => transacao.categoria, { cascade: true })
    transacoes: Relation<TransacaoEntity[]>

    @ManyToOne(() => UsuarioEntity, (usuario) => usuario.categorias)
    @JoinColumn({ name: 'usuario_id' })
    usuario: Relation<UsuarioEntity>
    
    static fromDomain(categoriaDomain: CategoriaDomain): CategoriaEntity {     
        const entity = new CategoriaEntity();
        Object.assign(entity, categoriaDomain.toModel())
        return entity;
    }

    toDomain(): CategoriaDomain {

        const categoria = {
            ...this,
            transacoes: this.transacoes?.map(transacao => transacao.toDomain()),
            usuario: this.usuario.toDomain()
        };
        return new CategoriaDomain(categoria);
    }

}