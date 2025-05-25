import { CategoriaModel } from "./models/categoria.model";
import { ClassificacaoCategoriaModel } from "./models/classificacao-categoria.model";
import { TipoCategoriaModel } from "./models/tipo-categoria.model";
import { TransacaoModel } from "./models/transacao.model";
import { EveryMoneyDomain } from "./every-money.domain";
import { UsuarioDomain } from "./usuario.domain";
import { TransacaoDomain } from "./transacao.domain";
import { TipoTransacaoModel } from "./models/tipo-transacao.model";



export class CategoriaDomain extends EveryMoneyDomain implements CategoriaModel {

    constructor(
        private readonly props: CategoriaModel,
    ) {
        super();
    }

    get id (): number { return this.props?.id; }
    get nome (): string { return this.props?.nome; }
    get tipo (): TipoCategoriaModel { return this.props?.tipo; }
    get classificacao (): ClassificacaoCategoriaModel { return this.props?.classificacao; }
    get usuario (): UsuarioDomain { return new UsuarioDomain(this.props?.usuario); }
    get createdAt (): Date { return this.props?.createdAt ?? new Date(); }
    get updatedAt (): Date { return this.props?.updatedAt ?? new Date(); }
    get transacoes (): TransacaoDomain[] { return this.props?.transacoes?.map(transacao => new TransacaoDomain(transacao)) ?? []; }

    toModel (): CategoriaModel {
        return {
            ...this.props,
            transacoes: this.transacoes.map(transacao => transacao.toModel())
        };
    }   

    get saldoRealizado (): number {
        return this.props.transacoes ? 
            this.props.transacoes.filter(transacao => transacao.tipo === TipoTransacaoModel.Entrada)
            .reduce((total, transacao) => total + transacao.valor, 0) 
            - this.props.transacoes.filter(transacao => transacao.tipo === TipoTransacaoModel.Saida)
            .reduce((total, transacao) => total + transacao.valor, 0)
        : 0;
    }

}