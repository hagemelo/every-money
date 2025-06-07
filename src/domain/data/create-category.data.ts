import { CategoriaModel } from "@domain/models/categoria.model";
import { UsuarioModel } from "@domain/models/usuario.model";

export type CreateCategoryData = {
    categoria: CategoriaModel;
    usuario: UsuarioModel;
}