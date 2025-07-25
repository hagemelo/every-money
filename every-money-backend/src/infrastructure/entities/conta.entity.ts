import { Column, CreateDateColumn, Entity, JoinColumn, ManyToOne, OneToMany, PrimaryGeneratedColumn, Relation, UpdateDateColumn } from "typeorm";
import { OrcamentoEntity } from "./orcamento.entity";
import { UsuarioEntity } from "./usuario.entity";
import { TipoContaModel } from "@domain/models/tipo-conta.model";
import { ContaDomain } from "@domain/conta.domain";
import { TransacaoEntity } from "./transacao.entity";
import { EveryMoneyEntity } from "@domain/every-money.entity";

type ContaProps = {
    id?: number;
    nome: string;
    saldoRealizado: number;
    saldoPrevisto: number;
    tipoConta: TipoContaModel;
    usuario: UsuarioEntity;
    createdAt?: Date;
    updatedAt?: Date;
    orcamentos?: OrcamentoEntity[]
    transacoes?: TransacaoEntity[]
}

@Entity('conta_tb')
export class ContaEntity extends EveryMoneyEntity {

    constructor(props?: ContaProps){
        super()
        if(props){
            this.id = props.id
            this.nome = props.nome
            this.saldoRealizado = props.saldoRealizado
            this.saldoPrevisto = props.saldoPrevisto
            this.tipoConta = props.tipoConta
            this.usuario = props.usuario
            this.createdAt = props.createdAt
            this.updatedAt = props.updatedAt
            this.orcamentos = props.orcamentos
            this.transacoes = props.transacoes
        }
    }

    @PrimaryGeneratedColumn({name: 'conta_id'})
    id: number;

    @Column()
    nome: string;
    
    @Column()
    saldoRealizado: number;
    
    @Column()
    saldoPrevisto: number;
    
    @Column({
        type: 'varchar', name: 'tipo_conta', enum: TipoContaModel, default: TipoContaModel.Outros
      })
    tipoConta: TipoContaModel;
    
    @ManyToOne(() => UsuarioEntity, (usuario) => usuario.contas)
    @JoinColumn({ name: 'usuario_id' })
    usuario: UsuarioEntity;
    
    @CreateDateColumn({ name: 'created_at' })
    createdAt: Date;
    
    @UpdateDateColumn({ name: 'updated_at' })
    updatedAt: Date;
    
    @OneToMany(() => OrcamentoEntity, (orcamento) => orcamento.conta)
    orcamentos: Relation<OrcamentoEntity[]>

    @OneToMany(() => TransacaoEntity, (transacao) => transacao.conta)
    transacoes: Relation<TransacaoEntity[]>

    static fromDomain(contaDomain: ContaDomain): ContaEntity {     
        
        const usuario = contaDomain.usuario ? UsuarioEntity.fromDomain(contaDomain.usuario): null;
        const orcamentos = contaDomain.orcamentos?.map(orcamento => OrcamentoEntity.fromDomain(orcamento));
        const transacoes = contaDomain.transacoes?.map(transacao => TransacaoEntity.fromDomain(transacao));
        const entity = new ContaEntity({...contaDomain.toModel(), usuario, orcamentos, transacoes});
        return entity;
    }

    toDomain(): ContaDomain {
        const conta = {
            ...this,
            orcamentos: this.orcamentos?.map(orcamento => orcamento.toDomain()),
            transacoes: this.transacoes?.map(transacao => transacao.toDomain()),
            usuario: this.usuario?.toDomain()
        };
        return new ContaDomain(conta);
    }
}