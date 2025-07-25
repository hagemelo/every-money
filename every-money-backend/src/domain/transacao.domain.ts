import { TipoTransacaoModel } from "./models/tipo-transacao.model";
import { TransacaoModel } from "./models/transacao.model";
import { EveryMoneyDomain } from "./every-money.domain";
import { ContaDomain } from "./conta.domain";
import { CategoriaDomain } from "./categoria.domain";
import { StatusTransacaoModel } from "./models/status-transacao.model";



export class TransacaoDomain extends EveryMoneyDomain implements TransacaoModel {

    constructor(
        private readonly props: TransacaoModel,
    ) {
        super();
        this.props.descricao = props.descricao ?? '';
        this.props.valor = props.valor ?? 0;
        this.props.data = props.data ?? new Date();
        this.props.tipo = props.tipo ?? TipoTransacaoModel.Entrada;
        this.props.status = props.status ?? StatusTransacaoModel.Avencer;
    }

    get id (): number { return this.props.id; }
    get descricao (): string { return this.props.descricao; }
    get valor (): number { return this.props.valor; }
    get data (): Date { return this.props.data; }
    get tipo (): TipoTransacaoModel { return this.props.tipo; }
    get categoria (): CategoriaDomain { return new CategoriaDomain(this.props.categoria); }
    get conta (): ContaDomain { return new ContaDomain(this.props.conta); }
    get createdAt (): Date { return this.props.createdAt ?? new Date(); }
    get updatedAt (): Date { return this.props.updatedAt ?? new Date(); }
    get status (): StatusTransacaoModel { return this.props.status; }

    set descricao (descricao: string) { this.props.descricao = descricao; }
    set valor (valor: number) { this.props.valor = valor; }
    set data (data: Date) { this.props.data = data; }
    set tipo (tipo: TipoTransacaoModel) { this.props.tipo = tipo; }
    set status (status: StatusTransacaoModel) { this.props.status = status; }

    toModel (): TransacaoModel {
        return {
            ...this.props
        };
    }

    addConta (conta: ContaDomain): ContaDomain { 
        this.props.conta = conta;
        return conta;
    }

    addCategoria (categoria: CategoriaDomain): CategoriaDomain { 
        this.props.categoria = categoria;
        return categoria;
    }

    checkStatus (): void {
        if (this.props.data < new Date()) {
            this.props.status = StatusTransacaoModel.Atrasada;
        } else {
            this.props.status = StatusTransacaoModel.Avencer;
        }
    }
    
    pagar (): void {
        this.props.status = StatusTransacaoModel.Paga;
    }

    receber (): void {
        this.props.status = StatusTransacaoModel.Recebida;
    }

    cancelar (): void {
        this.props.status = StatusTransacaoModel.Cancelada;
    }
}