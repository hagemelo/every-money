import { BackendApi } from "../api/backend-api.tsx";
import { LocalStorageService } from "../share/storage/local.storage.service.tsx";



export class LoginService{
    private localStorageService: LocalStorageService;

    constructor(private backendApi: BackendApi) {
        this.localStorageService = new LocalStorageService('token');
    }

    async login(email: string, senha: string): Promise<boolean>{
        const path = '/auth/login';
        const response = await this.backendApi.post(path, {email, senha});
        if(!response){
            return false;
        }

        this.localStorageService.setItem(response.accessToken);
        return true;
    }
    
}