import { Column, CreateDateColumn, Entity, JoinColumn, ManyToOne, PrimaryGeneratedColumn, UpdateDateColumn } from "typeorm";
import { TipoCategoriaModel } from "@domain/models/tipo-categoria.model";
import { ContaEntity } from "./conta.entity";
import { OrcamentoDomain } from "@domain/orcamento.domain";
import { EveryMoneyEntity } from "@domain/every-money.entity";
import { UsuarioEntity } from "./usuario.entity";
import { ClassificacaoCategoriaModel } from "@domain/models/classificacao-categoria.model";


type OrcamentoProps = {
    id?: number;
    mesReferencia: string;
    limite: number;
    tipoCategoria: TipoCategoriaModel;
    conta: ContaEntity;
    createdAt?: Date;
    updatedAt?: Date;
}

@Entity('orcamento_tb')
export class OrcamentoEntity extends EveryMoneyEntity {

    constructor(props?: OrcamentoProps){
        super()
        if(props){
            this.id = props.id
            this.mesReferencia = props.mesReferencia
            this.limite = props.limite
            this.tipoCategoria = props.tipoCategoria
            this.conta = props.conta
            this.createdAt = props.createdAt
            this.updatedAt = props.updatedAt
        }
    }
    
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

    static fromDomain(orcamentoDomain: OrcamentoDomain): OrcamentoEntity {     
        const conta = ContaEntity.fromDomain(orcamentoDomain.conta)
        const entity = new OrcamentoEntity({...orcamentoDomain.toModel(), conta});
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