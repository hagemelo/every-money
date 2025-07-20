import { BackendApi } from "../api/backend-api.tsx";
import { LocalStorageService } from "../share/storage/local.storage.service.tsx";

interface LoginCredentials {
    email: string;
    senha: string;
}

interface LoginResponse {
    accessToken: string;
    userAuthenticated: {
        id: string;
        name: string;
        email: string;
    };
}

interface LoginError {
    code: string;
    message: string;
}

export class LoginService {
    private localStorageToken: LocalStorageService;
    private localStorageName: LocalStorageService;
    private localStorageEmail: LocalStorageService;
    private localStorageId: LocalStorageService;

    constructor(private backendApi: BackendApi) {
        this.localStorageToken = new LocalStorageService('token');
        this.localStorageName = new LocalStorageService('userName');
        this.localStorageEmail = new LocalStorageService('userEmail');
        this.localStorageId = new LocalStorageService('userId');
    }

    async login(credentials: LoginCredentials): Promise<boolean> {
        const path = '/auth/login';
        try {
            const response = await this.backendApi.post(path, credentials);
            
            if (!response) {
                throw new Error('Unexpected empty response from server');
            }

            this.localStorageToken.setItem(response.accessToken);
            this.localStorageName.setItem(response.userAuthenticated.name);
            this.localStorageEmail.setItem(response.userAuthenticated.email);
            this.localStorageId.setItem(response.userAuthenticated.id);

            return true;
        } catch (error) {
            console.error('Login error:', error);
            return false;
        }
    }

    logout(): void {
        this.localStorageToken.removeItem();
        this.localStorageName.removeItem();
        this.localStorageEmail.removeItem();
        this.localStorageId.removeItem();
    }

    isLoggedIn(): boolean {
        return !!this.localStorageToken.getItem();
    }

    getUserInfo(): { name: string; email: string; id: string } | null {
        const name = this.localStorageName.getItem();
        const email = this.localStorageEmail.getItem();
        const id = this.localStorageId.getItem();

        if (!name || !email || !id) {
            return null;
        }

        return { name, email, id };
    }

    getToken(): string | null {
        return this.localStorageToken.getItem();
    }
}