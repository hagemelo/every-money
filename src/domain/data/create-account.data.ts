import { ContaModel } from "@domain/models/conta.model";
import { UsuarioModel } from "@domain/models/usuario.model";

export type CreateAccountData = {
    conta: ContaModel;
    usuario: UsuarioModel;
}