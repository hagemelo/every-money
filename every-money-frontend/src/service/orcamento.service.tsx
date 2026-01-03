
import { BackendApi } from "../api/backend-api";
import { Orcamento } from "../share/domain/orcamento";

export class OrcamentoService {

    constructor(private backendApi: BackendApi) {}

    public async loadOrcamentos(userId: number) : Promise<Orcamento[]> {

        const path = `/orcamento/listar-orcamentos/usuario/${userId}`;
        const result: Orcamento[] = await this.backendApi.securetyGet(path);
        return result;
    }
}