import { useState, useCallback } from 'react';
import { LocalStorageService } from '../share/storage/local.storage.service.tsx';

const localStorageName = new LocalStorageService('userName');
const localStorageEmail = new LocalStorageService('userEmail');
const localStorageId = new LocalStorageService('userId');

export function useUsuario() {
    const [usuario] = useState({
        name: localStorageName.getItem() ?? '',
        email: localStorageEmail.getItem() ?? '',
    });

    const getUserId = useCallback((): number => {
        const id = localStorageId.getItem();
        return id ? parseInt(id, 10) : 0;
    }, []);

    return { usuario, getUserId };
}
