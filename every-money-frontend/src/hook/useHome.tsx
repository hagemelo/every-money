import { useState } from 'react';
import { LocalStorageService } from "../share/storage/local.storage.service.tsx";
import { useEffect } from "react";
import { useHomeService } from "../share/context/context.tsx";
import { Conta } from '../share/domain/conta.tsx';

export const useHome = () => {

    const homeService = useHomeService();
    const localStorageName = new LocalStorageService('userName');
    const localStorageEmail = new LocalStorageService('userEmail');
    const [contas, setContas] =useState<Conta[]>([]);
    const [loading, setLoading] = useState(false);

    
    const localStorageUser = {
        name: localStorageName.getItem(),
        email: localStorageEmail.getItem()
    }

    async function  loadUserContas() {
      try {
          const localStorageId = new LocalStorageService('userId');
          const userId = localStorageId.getItem() ?? '0';
          const result = await homeService.loadContas(parseInt(userId));
    
          setContas(result);
          return result;
          } catch (err) {

      } finally {
          setLoading(false);
      }
    }

    useEffect(() => {
        loadUserContas(); 
    }, []);

    const [usuario, setUsuario] = useState(localStorageUser);
    
    return {
        usuario,
        setUsuario,
        contas,
        setContas,
        loading,
      };
    };

