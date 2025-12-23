import { Orcamento } from "./orcamento";
import { Transacao } from "./transacao";
import { Usuario } from "./usuario";

export interface Conta {
    id?: number;
    nome: string;
    saldoRealizado: number;
    saldoPrevisto: number;
    tipoConta: string;
    usuario: Usuario;
    orcamentos?: Orcamento[];
    transacoes?: Transacao[];
}