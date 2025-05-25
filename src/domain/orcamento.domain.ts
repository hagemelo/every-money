import { ContaModel } from "./models/conta.model";
import { OrcamentoModel } from "./models/orcamento.model";
import { TipoCategoriaModel } from "./models/tipo-categoria.model";
import { EveryMoneyDomain } from "./every-money.domain";


export class OrcamentoDomain extends EveryMoneyDomain implements OrcamentoModel {

    constructor(
        private readonly props: OrcamentoModel,
    ) {
        super();
    }

    get id (): number { return this.props?.id; }
    get mesReferencia (): string { return this.props?.mesReferencia; }
    get limite (): number { return this.props?.limite ?? 0; }
    get tipoCategoria (): TipoCategoriaModel { return this.props?.tipoCategoria; }
    get conta (): ContaModel { return this.props?.conta; }
    get createdAt (): Date { return this.props?.createdAt ?? new Date(); }
    get updatedAt (): Date { return this.props?.updatedAt ?? new Date(); }

    toModel (): OrcamentoModel {
        return this.props;
    }

}