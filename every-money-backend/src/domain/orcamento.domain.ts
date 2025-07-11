import { ContaModel } from "./models/conta.model";
import { OrcamentoModel } from "./models/orcamento.model";
import { TipoCategoriaModel } from "./models/tipo-categoria.model";
import { EveryMoneyDomain } from "./every-money.domain";
import { ContaDomain } from "./conta.domain";


export class OrcamentoDomain extends EveryMoneyDomain implements OrcamentoModel {

    constructor(
        private readonly props: OrcamentoModel,
    ) {
        super();
        this.props.mesReferencia = props.mesReferencia ?? '';
        this.props.limite = props.limite ?? 0;
        this.props.tipoCategoria = props.tipoCategoria ?? TipoCategoriaModel.Outros;
    }

    get id (): number { return this.props.id; }
    get mesReferencia (): string { return this.props.mesReferencia; }
    get limite (): number { return this.props.limite; }
    get tipoCategoria (): TipoCategoriaModel { return this.props.tipoCategoria; }
    get conta (): ContaDomain { return this.props.conta ? new ContaDomain(this.props.conta) : null; }
    get createdAt (): Date { return this.props.createdAt ?? new Date(); }
    get updatedAt (): Date { return this.props.updatedAt ?? new Date(); }

    set mesReferencia (mesReferencia: string) { this.props.mesReferencia = mesReferencia; }
    set limite (limite: number) { this.props.limite = limite; }
    set tipoCategoria (tipoCategoria: TipoCategoriaModel) { this.props.tipoCategoria = tipoCategoria; }
    set conta (conta: ContaDomain) { this.props.conta = conta.toModel(); }


    toModel (): OrcamentoModel {
        return {
            ...this.props,
            conta: this.conta.toModel()
        };
    }

    addConta (conta: ContaDomain): ContaDomain { 
       
        this.conta = conta;
        return conta;
    }

}