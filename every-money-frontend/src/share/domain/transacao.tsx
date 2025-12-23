import { Categoria } from "./categoria";
import { Conta } from "./conta";

export interface Transacao {
    id?: number;
    descricao: string;
    valor: number;
    data?: Date;
    tipo: string;
    categoria: Categoria;
    conta: Conta;
    status?: string;
}