import { Column, CreateDateColumn, Entity, JoinColumn, ManyToOne, OneToMany, PrimaryGeneratedColumn, UpdateDateColumn } from "typeorm"
import { CategoriaEntity } from "./categoria.entity"
import { TipoTransacaoModel } from "@domain/models/tipo-transacao.model"
import { ContaEntity } from "./conta.entity"
import { TransacaoDomain } from "@domain/transacao.domain"
import { EveryMoneyEntity } from "@domain/every-money.entity"

@Entity('transacao_tb')
export class TransacaoEntity extends EveryMoneyEntity{

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