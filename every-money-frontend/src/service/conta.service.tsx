import { BackendApi } from "../api/backend-api";
import { Conta } from "../share/domain/conta";
export interface CreateContaPayload {
    nome: string;
    saldoRealizado: number;
    saldoPrevisto: number;
    tipoConta: string;
}

export class ContaService {

    constructor(private backendApi: BackendApi) {}

    public async loadContas(userId: number) : Promise<Conta[]> {

        const path = `/conta/listar-contas/usuario/${userId}`;
        const result: Conta[] = await this.backendApi.securetyGet(path);
        return result;
    }

    public async createConta(conta: CreateContaPayload, userId: number): Promise<Conta> {
        const path = '/conta/criar-conta';
        return this.backendApi.securetyPost(path, {
            conta,
            usuario: { id: userId },
        });
    }
}