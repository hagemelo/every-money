import { useState, useEffect } from 'react';
import { LocalStorageService } from "../share/storage/local.storage.service.tsx";
import { useContaService } from "../share/context/context.tsx";
import { Conta } from '../share/domain/conta.tsx';
import { useTransacaoService } from '../share/context/context.tsx';

export const useTransaction = () => {

    const contaService = useContaService();
    const transacaoService = useTransacaoService();
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
          const result = await contaService.loadContas(parseInt(userId));
    
          setContas(result);
          return result;
          } catch (err) {

      } finally {
          setLoading(false);
      }
    }

    async function loadTransacoes(contaId: number){

        try {
          setLoading(true);
          const result = await transacaoService.loadTransacoes(contaId);
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
        loadTransacoes
      };
};

