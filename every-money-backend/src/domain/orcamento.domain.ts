
import { OrcamentoModel } from "./models/orcamento.model";
import { TipoCategoriaModel } from "./models/tipo-categoria.model";
import { EveryMoneyDomain } from "./every-money.domain";
import { ContaDomain } from "./conta.domain";
import { getCurrentMonthReference, getCurrentMonthReferenceFromDate } from "@application/helpers/get-current-month-reference";


export class OrcamentoDomain extends EveryMoneyDomain implements OrcamentoModel {

    constructor(
        private readonly props: OrcamentoModel,
    ) {
        super();
        this.props.limite = props.limite ?? 0;
        this.props.tipoCategoria = props.tipoCategoria ?? TipoCategoriaModel.Outros;

        if (!this.props.mesReferencia) {
            const now = new Date();
            const nowYear = now.getFullYear();
            const nowMonth = now.getMonth();
            const {ano = nowYear} = props;
            const mesAlvo = (props.mes ?? nowMonth) - 1;
            this.props.mesReferencia = getCurrentMonthReferenceFromDate(new Date(ano, mesAlvo, 1));
        }
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
    set conta (conta: ContaDomain) { this.props.conta = conta?.toModel(); }


    toModel (): OrcamentoModel {
        return {
            id: this.id,
            mesReferencia: this.mesReferencia,
            limite:this.limite,
            createdAt: this.createdAt,
            updatedAt: this.updatedAt,
            tipoCategoria: this.tipoCategoria,
            conta: this.conta?.toModel()
        };
    }

    addConta (conta: ContaDomain): ContaDomain { 
       
        this.conta = conta;
        return conta;
    }

}