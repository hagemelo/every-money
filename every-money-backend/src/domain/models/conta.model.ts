import { TipoContaModel } from "./tipo-conta.model";
import { UsuarioModel } from "./usuario.model";
import { OrcamentoModel } from "./orcamento.model";
import { TransacaoModel } from "./transacao.model";

export type ContaModel= {
    id?: number;
    nome: string;
    saldoRealizado: number;
    saldoPrevisto: number;
    tipoConta: TipoContaModel;
    usuario: UsuarioModel;
    createdAt?: Date;
    updatedAt?: Date;
    orcamentos?: OrcamentoModel[];
    transacoes?: TransacaoModel[];
}