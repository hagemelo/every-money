import { CategoriaModel } from "./categoria.model";
import { ContaModel } from "./conta.model";

export type UsuarioModel = {
    id?: number;
    nome: string;
    email: string;
    senha: string;
    createdAt?: Date;
    updatedAt?: Date;
    contas?: ContaModel[];
    categorias?: CategoriaModel[]
}