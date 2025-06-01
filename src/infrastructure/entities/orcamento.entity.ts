import { Column, CreateDateColumn, Entity, JoinColumn, ManyToOne, PrimaryGeneratedColumn, UpdateDateColumn } from "typeorm";
import { TipoCategoriaModel } from "@domain/models/tipo-categoria.model";
import { ContaEntity } from "./conta.entity";
import { OrcamentoDomain } from "@domain/orcamento.domain";
import { EveryMoneyEntity } from "@domain/every-money.entity";

@Entity('orcamento_tb')
export class OrcamentoEntity extends EveryMoneyEntity {
    
    @PrimaryGeneratedColumn({name: 'orc_id'})
    id: number;

    @Column()
    mesReferencia: string

    @Column()
    limite: number;

    @CreateDateColumn({ name: 'created_at' })
    createdAt: Date;
    
    @UpdateDateColumn({ name: 'updated_at' })
    updatedAt: Date;
    
    @Column({
        type: 'varchar', name: 'tipo_categoria', enum: TipoCategoriaModel, default: TipoCategoriaModel.Outros
      })
    tipoCategoria: TipoCategoriaModel;

    @ManyToOne(() => ContaEntity, (conta) => conta.orcamentos)
    @JoinColumn({ name: 'conta_id' })
    conta: ContaEntity;

    static fromDomain(contaDomain: OrcamentoDomain): OrcamentoEntity {     
        const entity = new OrcamentoEntity();
        Object.assign(entity, contaDomain.toModel())
        return entity;
    }

    toDomain(): OrcamentoDomain {

        const orcamento = {
                    ...this,
                    conta: this.conta.toDomain()
                };
        return new OrcamentoDomain(orcamento);
    }
}