import { CategoriaModel } from "./categoria.model";
import { ContaModel } from "./conta.model";
import { TipoTransacaoModel } from "./tipo-transacao.model";

export type TransacaoModel = {
    id?: number;
    descricao: string;
    valor: number;
    data?: Date;
    createdAt?: Date;
    updatedAt?: Date;
    tipo: TipoTransacaoModel;
    categoria: CategoriaModel;
    conta: ContaModel;
}