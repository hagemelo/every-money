import { useState, useEffect } from 'react';
import { LocalStorageService } from "../share/storage/local.storage.service.tsx";
import { Conta } from '../share/domain/conta.tsx';
import { useContaService } from '../share/context/context.tsx';



export const useAccount = () => {

    const contaService = useContaService();
    const localStorageName = new LocalStorageService('userName');
    const localStorageEmail = new LocalStorageService('userEmail');
    const [contas, setContas] =useState<Conta[]>([]);
    const [loading, setLoading] = useState(false);

    const localStorageUser = {
        name: localStorageName.getItem(),
        email: localStorageEmail.getItem()
    }

    const [usuario, setUsuario] = useState(localStorageUser);

    async function  loadUserContas() {
      try {
          const localStorageId = new LocalStorageService('userId');
          const userId = localStorageId.getItem() ?? '0';
          const result = await contaService.loadContas(parseInt(userId));
    
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

    return {
        usuario,
        contas,
        setContas,
        setUsuario,
      };
    
}