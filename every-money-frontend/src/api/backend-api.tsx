import axios from 'axios';

const urlBase = process.env.REACT_APP_BACKEND_API || 'http://localhost:3000';

const defaultHeaders = {
    'Access-Control-Allow-Origin': '*',
    'Content-Type': 'application/json'
}


const api = axios.create({
    baseURL: urlBase,
    headers: defaultHeaders
});


export class BackendApi {

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

}
