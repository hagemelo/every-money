import axios from 'axios';
import { LocalStorageService } from '../share/storage/local.storage.service.tsx';
import { NoTokenAvailableError } from '../share/erros/no-token-available.error.tsx';

const urlBase = process.env.REACT_APP_BACKEND_API || 'http://localhost:3000';

const defaultHeaders = {
    'Access-Control-Allow-Origin': '*',
    'Content-Type': 'application/json'
}


const api = axios.create({
    baseURL: urlBase,
    headers: defaultHeaders
});

const retryRefreshToken = 3;


export class BackendApi {

    private localStorageRefreshToken: LocalStorageService;
    private localStorageToken: LocalStorageService;

    constructor() {
        this.localStorageRefreshToken = new LocalStorageService('refreshToken');
        this.localStorageToken = new LocalStorageService('token');
    }

    async get(path: string): Promise<any> {

        try{
            const result = await api.get(path);
            return result.data;
        }catch(error){
            console.error('Error get', error);
            throw error;
        }
    }

    async post(path: string, data: any): Promise<any> {
        try{
            const result = await api.post(path, data);
            return result.data;
        }catch(error){
            console.error('Error fetching data:', error);
            throw error;
        }
    }

    async securetyGet(path: string, retryCount: number = 0): Promise<any> {
        if (retryCount >= retryRefreshToken) {
            throw new NoTokenAvailableError();
        }

        const token = this.localStorageToken.getItem();

        if (!token) {
           throw new NoTokenAvailableError();
        }

        try{
            const headers = {
                'Authorization': `Bearer ${token}`
            }
            const result = await api.get(path, { headers });
            return result.data;
        }catch(error){
            console.log('Novo Error in securetyGet:', error);
            await this.refreshToken();
            return await this.securetyGet(path, retryCount + 1);
        }
    }

    async securetyPost(path: string, data: any, retryCount: number = 0): Promise<any> {
        if (retryCount >= retryRefreshToken) {
            throw new NoTokenAvailableError();
        }
        
        const token = this.localStorageToken.getItem();
        
        if (!token) {
           throw new NoTokenAvailableError();
        }
        
        try{
            const headers = {
                'Authorization': `Bearer ${token}`
            }
            const result = await api.post(path, data, { headers });
            if (result.status === 401) {
                await this.refreshToken();
                return await this.securetyPost(path, data, retryCount + 1);
            }
            return result.data;
        }catch(error){
            console.error('Error fetching data:', error);
            throw error;
        }
    }

    private async refreshToken(): Promise<void> {
        try {
            const token = this.localStorageRefreshToken.getItem();
            if (!token) {
                throw new NoTokenAvailableError();
            }
            const headers = {
                'Authorization': `Bearer ${token}`
            };
            const result = await api.post('/auth/refresh',{}, { headers });
            this.localStorageToken.setItem(result.data.accessToken);
            this.localStorageRefreshToken.setItem(result.data.refreshToken);
        } catch {
            throw new NoTokenAvailableError();
        }
    }

}
