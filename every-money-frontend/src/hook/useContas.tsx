import { useState, useEffect, useCallback } from 'react';
import { useContaService } from '../share/context/context.tsx';
import { Conta } from '../share/domain/conta.tsx';
import { useUsuario } from './useUsuario.tsx';

export function useContas() {
    const contaService = useContaService();
    const { getUserId } = useUsuario();
    const [contas, setContas] = useState<Conta[]>([]);
    const [loading, setLoading] = useState(true);
    const [error, setError] = useState<string | null>(null);

    const loadContas = useCallback(async () => {
        try {
            setLoading(true);
            setError(null);
            const result = await contaService.loadContas(getUserId());
            setContas(result);
            return result;
        } catch {
            setError('Não foi possível carregar as contas.');
            return [];
        } finally {
            setLoading(false);
        }
    }, [contaService, getUserId]);

    const createConta = useCallback(
        async (nome: string, tipoConta: string) => {
            const userId = getUserId();
            const conta = await contaService.createConta(
                { nome, saldoRealizado: 0, saldoPrevisto: 0, tipoConta },
                userId
            );
            await loadContas();
            return conta;
        },
        [contaService, getUserId, loadContas]
    );

    useEffect(() => {
        loadContas();
    }, [loadContas]);

    return { contas, loading, error, loadContas, createConta, setContas };
}
