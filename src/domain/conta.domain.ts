import { ContaModel } from "./models/conta.model";
import { TipoContaModel } from "./models/tipo-conta.model";
import { TipoTransacaoModel } from "./models/tipo-transacao.model";

import { OrcamentoDomain } from "./orcamento.domain";
import { TransacaoDomain } from "./transacao.domain";
import { UsuarioDomain } from "./usuario.domain";
import { EveryMoneyDomain } from "./every-money.domain";


export class ContaDomain extends EveryMoneyDomain implements ContaModel {

    constructor(
        private readonly props: ContaModel,
    ) {
        super();
        this.props.nome = props.nome ?? '';
        this.props.saldoRealizado = props.saldoRealizado ?? 0;
        this.props.saldoPrevisto = props.saldoPrevisto ?? 0;
        this.props.tipoConta = props.tipoConta ?? TipoContaModel.Outros;
    }

    get id (): number { return this.props?.id; }
    get nome (): string { return this.props?.nome; }
    get saldoRealizado (): number { return this.props?.saldoRealizado ?? 0; }
    get saldoPrevisto (): number { return this.props?.saldoPrevisto ?? 0; }
    get tipoConta (): TipoContaModel { return this.props?.tipoConta; }
    get usuario (): UsuarioDomain { return this.props?.usuario ? new UsuarioDomain(this.props?.usuario) : null; }
    get createdAt (): Date { return this.props?.createdAt ?? new Date(); }
    get updatedAt (): Date { return this.props?.updatedAt ?? new Date(); }
    get orcamentos (): OrcamentoDomain[] { return this.props?.orcamentos?.map(orcamento => new OrcamentoDomain(orcamento)) ?? []; }
    get transacoes (): TransacaoDomain[] { return this.props?.transacoes?.map(transacao => new TransacaoDomain(transacao)) ?? []; }

    set nome (nome: string) { this.props.nome = nome; }
    set saldoRealizado (saldoRealizado: number) { this.props.saldoRealizado = saldoRealizado; }
    set saldoPrevisto (saldoPrevisto: number) { this.props.saldoPrevisto = saldoPrevisto; }
    set tipoConta (tipoConta: TipoContaModel) { this.props.tipoConta = tipoConta; }
    set usuario (usuario: UsuarioDomain) { this.props.usuario = usuario.toModel(); }


    toModel (): ContaModel {
        return {
            ...this.props,
            usuario: this.usuario.toModel(),
            orcamentos: this.orcamentos.map(orcamento => orcamento.toModel()),
            transacoes: this.transacoes.map(transacao => transacao.toModel())
        };
    }

    calcularSaldoRealizado (): void {
        this.props.saldoRealizado = this.props.transacoes ? 
            this.props.transacoes.filter(transacao => transacao.tipo === TipoTransacaoModel.Entrada)
            .reduce((total, transacao) => total + transacao.valor, 0) 
            - this.props.transacoes.filter(transacao => transacao.tipo === TipoTransacaoModel.Saida)
            .reduce((total, transacao) => total + transacao.valor, 0)
        : 0;
    }

    calcularSaldoPrevisto (): void {
        this.props.saldoPrevisto = this.props.orcamentos ? 
            this.props.orcamentos.reduce((total, orcamento) => total + orcamento.limite, 0)
        : 0;
    }

    addUsuario (usuario: UsuarioDomain): UsuarioDomain { 
        this.usuario = usuario;
        return usuario;
    }

}

   