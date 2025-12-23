import { Categoria } from "./categoria.tsx";
import { Conta } from "./conta";

export interface Usuario {
    id?: number;
    nome: string;
    email: string;
    contas?: Conta[];
    categorias?: Categoria[]

}