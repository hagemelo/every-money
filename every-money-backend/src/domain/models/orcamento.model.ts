import { ContaModel } from "./conta.model";
import { TipoCategoriaModel } from "./tipo-categoria.model";

export type OrcamentoModel = {
    id?: number;
    mesReferencia: string;
    limite: number;
    createdAt?: Date;
    updatedAt?: Date;
    tipoCategoria: TipoCategoriaModel;
    conta: ContaModel;
    mes?: number;
    ano?: number;
}