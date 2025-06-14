import { OrcamentoModel } from "./orcamento.model";
import { TransacaoModel } from "./transacao.model";

export type MovimentacaoContasModel= {
    id?: number;
    razao: string;
    idDeConta: number;
    idParaConta: number;
    createdAt?: Date;
    updatedAt?: Date;
    orcamentos?: OrcamentoModel[];
    transacoes?: TransacaoModel[];
}