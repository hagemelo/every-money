import { Column, CreateDateColumn, Entity, JoinColumn, ManyToOne, OneToMany, PrimaryGeneratedColumn, UpdateDateColumn } from "typeorm"
import { CategoriaEntity } from "./categoria.entity"
import { TipoTransacaoModel } from "@domain/models/tipo-transacao.model"
import { ContaEntity } from "./conta.entity"
import { TransacaoDomain } from "@domain/transacao.domain"
import { EveryMoneyEntity } from "@domain/every-money.entity"
import { StatusTransacaoModel } from "@domain/models/status-transacao.model"

type TransacaoProps = {
    id?: number;
    descricao: string;
    valor: number;
    data?: Date;
    tipo: TipoTransacaoModel;
    categoria: CategoriaEntity;
    conta: ContaEntity;
    createdAt?: Date;
    updatedAt?: Date;
    status?: StatusTransacaoModel;
}


@Entity('transacao_tb')
export class TransacaoEntity extends EveryMoneyEntity{

    constructor(props?: TransacaoProps){
        super()
        if(props){
            this.id = props.id
            this.descricao = props.descricao
            this.valor = props.valor
            this.data = props.data
            this.tipo = props.tipo
            this.categoria = props.categoria
            this.conta = props.conta
            this.createdAt = props.createdAt
            this.updatedAt = props.updatedAt
            this.status = props.status
        }
    }

    @PrimaryGeneratedColumn({name: 'trans_id'})
    id: number

    @Column()
    descricao: string

    @Column()
    valor: number;

    @Column()
    data: Date;

    @CreateDateColumn({ name: 'created_at' })
    createdAt: Date;
    
    @UpdateDateColumn({ name: 'updated_at' })
    updatedAt: Date;

    @Column({
    type: 'varchar', name: 'tipo', enum: TipoTransacaoModel, default: TipoTransacaoModel.Entrada
    })
    tipo: TipoTransacaoModel;

    @Column({
    type: 'varchar', name: 'status', enum: StatusTransacaoModel, default: StatusTransacaoModel.Avencer
    })
    status: StatusTransacaoModel;
    
    @ManyToOne(() => CategoriaEntity, (categoria) => categoria.transacoes)
    @JoinColumn({ name: 'categoria_id' })
    categoria: CategoriaEntity;

    
    @ManyToOne(() => ContaEntity, (conta) => conta.orcamentos)
    @JoinColumn({ name: 'conta_id' })
    conta: ContaEntity;

    static fromDomain(transacaoDomain: TransacaoDomain): TransacaoEntity {     
        const categoria = CategoriaEntity.fromDomain(transacaoDomain.categoria)
        const conta = ContaEntity.fromDomain(transacaoDomain.conta)
        const entity = new TransacaoEntity({...transacaoDomain.toModel(), categoria, conta});
        return entity;
    }   

    toDomain(): TransacaoDomain {
        const transacao = {
            ...this,
            categoria: this.categoria?.toDomain(),
            conta: this.conta?.toDomain()
        };
        return new TransacaoDomain(transacao);
    }
}