import { Transacao } from "./transacao";
import { Usuario } from "./usuario";

export interface Categoria {
    id?: number;
    nome: string;
    tipo: string;
    classificacao: string;
    usuario: Usuario;
    transacoes?: Transacao[];
}
