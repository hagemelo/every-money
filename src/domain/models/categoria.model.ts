import { ClassificacaoCategoriaModel } from "./classificacao-categoria.model";
import { TipoCategoriaModel } from "./tipo-categoria.model";
import { TransacaoModel } from "./transacao.model";
import { UsuarioModel } from "./usuario.model";

export type CategoriaModel = {
    id?: number;
    nome: string;
    tipo: TipoCategoriaModel;
    classificacao: ClassificacaoCategoriaModel;
    usuario: UsuarioModel;
    createdAt?: Date;
    updatedAt?: Date;
    transacoes?: TransacaoModel[];
}