import { CategoriaModel } from "./models/categoria.model";
import { ClassificacaoCategoriaModel } from "./models/classificacao-categoria.model";
import { TipoCategoriaModel } from "./models/tipo-categoria.model";
import { EveryMoneyDomain } from "./every-money.domain";
import { UsuarioDomain } from "./usuario.domain";
import { TransacaoDomain } from "./transacao.domain";
import { TipoTransacaoModel } from "./models/tipo-transacao.model";



export class CategoriaDomain extends EveryMoneyDomain implements CategoriaModel {

    constructor(
        private readonly props: CategoriaModel,
    ) {
        super();
        this.props.nome = props.nome ?? '';
        this.props.tipo = props.tipo ?? TipoCategoriaModel.Outros;
        this.props.classificacao = props.classificacao ?? ClassificacaoCategoriaModel.OutrosGastos;
    }

    get id (): number { return this.props.id; }
    get nome (): string { return this.props.nome; }
    get tipo (): TipoCategoriaModel { return this.props.tipo; }
    get classificacao (): ClassificacaoCategoriaModel { return this.props.classificacao; }
    get usuario (): UsuarioDomain { return new UsuarioDomain(this.props.usuario); }
    get transacoes (): TransacaoDomain[] { return this.props.transacoes?.map(transacao => new TransacaoDomain(transacao)) ?? []; }

    set usuario (usuario: UsuarioDomain) { this.props.usuario = usuario.toModel(); }
    set nome (nome: string) { this.props.nome = nome; }
    set tipo (tipo: TipoCategoriaModel) { this.props.tipo = tipo; }
    set classificacao (classificacao: ClassificacaoCategoriaModel) { this.props.classificacao = classificacao; }

    toModel (): CategoriaModel {
        return {
            ...this.props,
            usuario: this.usuario.toModel(),
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

    addUsuario (usuario: UsuarioDomain): UsuarioDomain { 
        this.usuario = usuario;
        return usuario;
    }

}