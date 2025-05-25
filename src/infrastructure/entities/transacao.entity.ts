import { Column, Entity, JoinColumn, ManyToOne, OneToMany, PrimaryGeneratedColumn } from "typeorm"
import { CategoriaEntity } from "./categoria.entity"
import { TipoTransacaoModel } from "@domain/models/tipo-transacao.model"
import { ContaEntity } from "./conta.entity"
import { TransacaoDomain } from "@domain/transacao.domain"
import { EveryMoneyEntity } from "@domain/every-money.entity"

@Entity('transacao_tb')
export class TransacaoEntity extends EveryMoneyEntity{

    @Column({name: 'trans_id'})
    @PrimaryGeneratedColumn()
    id: number

    @Column()
    descricao: string

    @Column()
    valor: number;

    @Column()
    data: Date;

    @Column()
    createdAt: Date;
    
    @Column()
    updatedAt: Date;

    @Column({
    type: 'enum', name: 'tipo', enum: TipoTransacaoModel, default: TipoTransacaoModel.Entrada
    })
    tipo: TipoTransacaoModel;

    
    @ManyToOne(() => CategoriaEntity, (categoria) => categoria.transacoes)
    @JoinColumn({ name: 'categoria_id' })
    categoria: CategoriaEntity;

    
    @ManyToOne(() => ContaEntity, (conta) => conta.orcamentos)
    @JoinColumn({ name: 'conta_id' })
    conta: ContaEntity;

    static fromDomain(transacaoDomain: TransacaoDomain): TransacaoEntity {     
        const entity = new TransacaoEntity();
        Object.assign(entity, transacaoDomain.toModel())
        return entity;
    }

    toDomain(): TransacaoDomain {
        const transacao = {
            ...this,
            categoria: this.categoria.toDomain(),
            conta: this.conta.toDomain()
        };
        return new TransacaoDomain(transacao);
    }
}