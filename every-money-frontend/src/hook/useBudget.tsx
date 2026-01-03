import { useState, useEffect } from 'react';
import { LocalStorageService } from "../share/storage/local.storage.service.tsx";
import { useOrcamentoService } from '../share/context/context.tsx';
import { Orcamento } from '../share/domain/orcamento.tsx';

export const useBudget = () => {

    const orcamentoService = useOrcamentoService();
    const localStorageName = new LocalStorageService('userName');
    const localStorageEmail = new LocalStorageService('userEmail');
    const [orcamentos, setOrcamentos] =useState<Orcamento[]>([]);
    const [loading, setLoading] = useState(false);

    const localStorageUser = {
        name: localStorageName.getItem(),
        email: localStorageEmail.getItem()
    }

    const [usuario, setUsuario] = useState(localStorageUser);

    async function  loadUserOrcamentos() {
      try {
          const localStorageId = new LocalStorageService('userId');
          const userId = localStorageId.getItem() ?? '0';
          const result = await orcamentoService.loadOrcamentos(parseInt(userId));
    
          setOrcamentos(result);
          return result;
          } catch (err) {

      } finally {
          setLoading(false);
      }
    }

    useEffect(() => {
        loadUserOrcamentos(); 
    }, []);

    return {
        usuario,
        orcamentos,
        setOrcamentos,
        setUsuario,
    };
    
}