import { Conta } from "./conta";

export interface Orcamento  {
    id?: number;
    mesReferencia: string;
    limite: number;
    createdAt?: Date;
    updatedAt?: Date;
    tipoCategoria: string;
    conta: Conta;
}