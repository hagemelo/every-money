import { BackendApi } from "../api/backend-api";
import { Conta } from "../share/domain/conta";
import { LocalStorageService } from "../share/storage/local.storage.service.tsx";


export class HomeService {
    
    private localStorageToken: LocalStorageService;
    
    constructor(private backendApi: BackendApi) {
        this.localStorageToken = new LocalStorageService('token');
    }

    public async loadContas(userId: number) : Promise<Conta[]> {
        const token = this.localStorageToken.getItem();
        const path = `/conta/listar-contas/usuario/${userId}`;
        const result: Conta[] = await this.backendApi.securetyGet(path, token!);
        return result;
    }
}