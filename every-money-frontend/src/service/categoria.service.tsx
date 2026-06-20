

import { BackendApi } from "../api/backend-api";
import { Categoria } from "../share/domain/categoria";
export interface CreateCategoriaPayload {
    nome: string;
    tipo: string;
    classificacao: string;
}

export class CategoriaService {

    constructor(private backendApi: BackendApi) {}

    public async loadCategorias(userId: number) : Promise<Categoria[]> {

        const path = `/categoria/listar-categorias/usuario/${userId}`;
        const result: Categoria[] = await this.backendApi.securetyGet(path);
        return result;
    }

    public async createCategoria(categoria: CreateCategoriaPayload, userId: number): Promise<Categoria> {
        const path = '/categoria/criar-categoria';
        return this.backendApi.securetyPost(path, {
            categoria,
            usuario: { id: userId },
        });
    }
}