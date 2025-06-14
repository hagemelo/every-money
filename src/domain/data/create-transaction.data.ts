import { TransacaoModel } from "@domain/models/transacao.model";

export type CreateTransactionData = {
    transacao: TransacaoModel;
    contaId: number;
    categoriaId: number;
}