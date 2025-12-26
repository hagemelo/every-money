import { useState } from 'react';
import { LocalStorageService } from "../share/storage/local.storage.service.tsx";


export const useHome = () => {


    const localStorageName = new LocalStorageService('userName');
    const localStorageEmail = new LocalStorageService('userEmail');

    
    const localStorageUser = {
        name: localStorageName.getItem(),
        email: localStorageEmail.getItem()
    }

    

    const [usuario, setUsuario] = useState(localStorageUser);

    return {
        usuario,
        setUsuario,
      };
    };

