import { useState, useCallback } from 'react';
import { useContas } from './useContas.tsx';
import { useCategorias } from './useCategorias.tsx';
import { useUsuario } from './useUsuario.tsx';
import { useTransacaoService } from '../share/context/context.tsx';
import { parseMesReferencia } from '../share/utils/date.utils.js';
import { CreateTransacaoPayload } from '../service/transacao.service.tsx';

export const useTransaction = () => {
    const { usuario } = useUsuario();
    const { contas, loading: contasLoading, loadContas } = useContas();
    const { categorias, loading: categoriasLoading, loadCategorias, createCategoria } = useCategorias();
    const transacaoService = useTransacaoService();
    const [loading, setLoading] = useState(false);
    const [submitting, setSubmitting] = useState(false);
    const [error, setError] = useState<string | null>(null);

    const loadTransacoes = useCallback(async (contaId: number) => {
        try {
            setLoading(true);
            setError(null);
            return await transacaoService.loadTransacoes(contaId);
        } catch {
            setError('Não foi possível carregar as transações.');
            return [];
        } finally {
            setLoading(false);
        }
    }, [transacaoService]);

    const loadTransacoesMes = useCallback(async (contaId: number, mesReferencia: string) => {
        try {
            setLoading(true);
            setError(null);
            const { year, month } = parseMesReferencia(mesReferencia);
            return await transacaoService.loadTransacoesByYearAndMonth(contaId, year, month);
        } catch {
            setError('Não foi possível carregar as transações.');
            return [];
        } finally {
            setLoading(false);
        }
    }, [transacaoService]);

    const createTransacao = useCallback(async (
        contaId: number,
        categoriaId: number,
        payload: CreateTransacaoPayload
    ) => {
        setSubmitting(true);
        try {
            const result = await transacaoService.createTransacao(contaId, categoriaId, payload);
            await loadContas();
            return result;
        } finally {
            setSubmitting(false);
        }
    }, [transacaoService, loadContas]);

    return {
        usuario,
        contas,
        categorias,
        loading: loading || contasLoading || categoriasLoading,
        submitting,
        error,
        loadTransacoes,
        loadTransacoesMes,
        createTransacao,
        createCategoria,
        loadCategorias,
    };
};
