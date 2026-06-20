
import { BackendApi } from "../api/backend-api";
import { Orcamento } from "../share/domain/orcamento";
export interface CreateOrcamentoPayload {
    mesReferencia: string;
    limite: number;
    tipoCategoria: string;
}

export class OrcamentoService {

    constructor(private backendApi: BackendApi) {}

    public async loadOrcamentos(userId: number) : Promise<Orcamento[]> {

        const path = `/orcamento/listar-orcamentos/usuario/${userId}`;
        const result: Orcamento[] = await this.backendApi.securetyGet(path);
        return result;
    }

    public async createOrcamento(contaId: number, payload: CreateOrcamentoPayload): Promise<Orcamento> {
        const path = `/orcamento/criar-orcamento/conta/${contaId}`;
        return this.backendApi.securetyPost(path, payload);
    }
}