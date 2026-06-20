import { useState, useEffect, useCallback } from 'react';
import { useOrcamentoService } from '../share/context/context.tsx';
import { Orcamento } from '../share/domain/orcamento.tsx';
import { useUsuario } from './useUsuario.tsx';
import { useContas } from './useContas.tsx';
import { CreateOrcamentoPayload } from '../service/orcamento.service.tsx';

export const useBudget = () => {
    const orcamentoService = useOrcamentoService();
    const { usuario, getUserId } = useUsuario();
    const { contas, loadContas } = useContas();
    const [orcamentos, setOrcamentos] = useState<Orcamento[]>([]);
    const [loading, setLoading] = useState(true);
    const [submitting, setSubmitting] = useState(false);
    const [error, setError] = useState<string | null>(null);

    const loadOrcamentos = useCallback(async () => {
        try {
            setLoading(true);
            setError(null);
            const result = await orcamentoService.loadOrcamentos(getUserId());
            setOrcamentos(result);
            return result;
        } catch {
            setError('Não foi possível carregar os orçamentos.');
            return [];
        } finally {
            setLoading(false);
        }
    }, [orcamentoService, getUserId]);

    const createOrcamento = useCallback(async (contaId: number, payload: CreateOrcamentoPayload) => {
        setSubmitting(true);
        try {
            const result = await orcamentoService.createOrcamento(contaId, payload);
            await loadOrcamentos();
            await loadContas();
            return result;
        } finally {
            setSubmitting(false);
        }
    }, [orcamentoService, loadOrcamentos, loadContas]);

    useEffect(() => {
        loadOrcamentos();
    }, [loadOrcamentos]);

    return {
        usuario,
        contas,
        orcamentos,
        loading,
        submitting,
        error,
        loadOrcamentos,
        createOrcamento,
    };
};
