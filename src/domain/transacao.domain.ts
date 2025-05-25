import { CategoriaModel } from "./models/categoria.model";
import { ContaModel } from "./models/conta.model";
import { TipoTransacaoModel } from "./models/tipo-transacao.model";
import { TransacaoModel } from "./models/transacao.model";
import { EveryMoneyDomain } from "./every-money.domain";



export class TransacaoDomain extends EveryMoneyDomain implements TransacaoModel {

    constructor(
        private readonly props: TransacaoModel,
    ) {
        super();
    }

    get id (): number { return this.props?.id; }
    get descricao (): string { return this.props?.descricao; }
    get valor (): number { return this.props?.valor ?? 0; }
    get data (): Date { return this.props?.data ?? new Date(); }
    get tipo (): TipoTransacaoModel { return this.props?.tipo; }
    get categoria (): CategoriaModel { return this.props?.categoria; }
    get conta (): ContaModel { return this.props?.conta; }
    get createdAt (): Date { return this.props?.createdAt ?? new Date(); }
    get updatedAt (): Date { return this.props?.updatedAt ?? new Date(); }

    toModel (): TransacaoModel {
        return this.props;
    }

}