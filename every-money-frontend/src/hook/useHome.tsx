import { useEffect, useState } from 'react';
import { LocalStorageService } from "../share/storage/local.storage.service.tsx";
import { useHomeService } from '../share/context/context.tsx';
import { Conta } from '../share/domain/conta.tsx';

export const useHome = () => {

    const [contas, setContas] = useState<Conta[]>([]);
    const homeService = useHomeService();
    const localStorageName = new LocalStorageService('userName');
    const localStorageEmail = new LocalStorageService('userEmail');
    const [loading, setLoading] = useState(false);
    const [error, setError] = useState<string | null>(null);
    
    
    const localStorageUser = {
        name: localStorageName.getItem(),
        email: localStorageEmail.getItem()
    }

    async function  loadUserContas() {
      try {
        setLoading(true);
        const localStorageId = new LocalStorageService('userId');
        const userId = localStorageId.getItem()
        const result = await homeService.loadContas(parseInt(userId!));
        console.log(result);
        setContas(result);
        return result;
        } catch (err) {
        setError("Erro ao carregar contas");
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
        loading,
        error,
        loadUserContas,
      };
    };

