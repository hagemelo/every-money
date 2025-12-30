import { BackendApi } from "../api/backend-api";
import { Conta } from "../share/domain/conta";

export class HomeService {

    constructor(private backendApi: BackendApi) {}

    public async loadContas(userId: number) : Promise<Conta[]> {

        const path = `/conta/listar-contas/usuario/${userId}`;
        const result: Conta[] = await this.backendApi.securetyGet(path);
        return result;
    }
}