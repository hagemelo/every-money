import { CategoriaModel } from "./categoria.model";
import { ContaModel } from "./conta.model";
import { StatusTransacaoModel } from "./status-transacao.model";
import { TipoTransacaoModel } from "./tipo-transacao.model";

export type TransacaoModel = {
    id?: number;
    descricao: string;
    valor: number;
    mesReferencia: string;
    data: Date;
    createdAt?: Date;
    updatedAt?: Date;
    tipo: TipoTransacaoModel;
    categoria: CategoriaModel;
    conta: ContaModel;
    status?: StatusTransacaoModel;
}