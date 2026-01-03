

import { BackendApi } from "../api/backend-api";
import { Categoria } from "../share/domain/categoria";

export class CategoriaService {

    constructor(private backendApi: BackendApi) {}

    public async loadCategorias(userId: number) : Promise<Categoria[]> {

        const path = `/categoria/listar-categorias/usuario/${userId}`;
        const result: Categoria[] = await this.backendApi.securetyGet(path);
        return result;
    }
}