import { BackendApi } from '../backend-api';
import axios from 'axios';

jest.mock('axios');

describe('BackendApi', () => {
    let backendApi: BackendApi;
    
    beforeEach(() => {
        backendApi = new BackendApi();
        jest.clearAllMocks();
    });

    describe('get', () => {
        it('should successfully fetch data', async () => {
            const mockResponse = { data: { message: 'success' } };
            (axios.get as jest.Mock).mockResolvedValue(mockResponse);

            const result = await backendApi.get('/test');
            expect(result).toEqual(mockResponse.data);
            expect(axios.get).toHaveBeenCalledWith('/test');
        });

        it('should throw error when request fails', async () => {
            const mockError = new Error('API error');
            (axios.get as jest.Mock).mockRejectedValue(mockError);

            await expect(backendApi.get('/test')).rejects.toThrow('API error');
            expect(console.error).toHaveBeenCalledWith('Error get', mockError);
        });
    });

    describe('post', () => {
        it('should successfully post data', async () => {
            const mockData = { key: 'value' };
            const mockResponse = { data: { message: 'success' } };
            (axios.post as jest.Mock).mockResolvedValue(mockResponse);

            const result = await backendApi.post('/test', mockData);
            expect(result).toEqual(mockResponse.data);
            expect(axios.post).toHaveBeenCalledWith('/test', mockData);
        });

        it('should throw error when request fails', async () => {
            const mockError = new Error('API error');
            (axios.post as jest.Mock).mockRejectedValue(mockError);

            await expect(backendApi.post('/test', {})).rejects.toThrow('API error');
            expect(console.error).toHaveBeenCalledWith('Error fetching data:', mockError);
        });
    });
});
