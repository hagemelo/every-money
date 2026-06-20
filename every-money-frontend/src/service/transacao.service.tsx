
import { BackendApi } from "../api/backend-api";
import { Transacao } from "../share/domain/transacao";

export interface CreateTransacaoPayload {
    descricao: string;
    valor: number;
    mesReferencia: string;
    data: string;
    tipo: string;
    status?: string;
}

export class TransacaoService {

    constructor(private backendApi: BackendApi) {}

    public async loadTransacoes(contaId: number) : Promise<Transacao[]> {

        const path = `/transacao/listar-transacoes/conta/${contaId}`;
        const result: Transacao[] = await this.backendApi.securetyGet(path);
        return result;
    }

     public async loadTransacoesByYearAndMonth(contaId: number, year: number, month: number) : Promise<Transacao[]> {

        const path = `/transacao/listar-transacoes/conta/${contaId}/ano/${year}/mes/${month}`;
        const result: Transacao[] = await this.backendApi.securetyGet(path);
        return result;
    }

    public async createTransacao(
        contaId: number,
        categoriaId: number,
        payload: CreateTransacaoPayload
    ): Promise<Transacao> {
        const path = `/transacao/criar-transacao/conta/${contaId}/categoria/${categoriaId}`;
        return this.backendApi.securetyPost(path, payload);
    }

}