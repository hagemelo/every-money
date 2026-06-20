import { useState, useCallback, useEffect } from 'react';
import { useContas } from './useContas.tsx';
import { useCategorias } from './useCategorias.tsx';
import { useUsuario } from './useUsuario.tsx';
import { useTransacaoService, useOrcamentoService } from '../share/context/context.tsx';
import { parseMesReferencia } from '../share/utils/date.utils.js';
import { CreateTransacaoPayload } from '../service/transacao.service.tsx';
import { CreateOrcamentoPayload } from '../service/orcamento.service.tsx';
import { Orcamento } from '../share/domain/orcamento.tsx';

export const useHome = () => {
    const { usuario, getUserId } = useUsuario();
    const { contas, loading: contasLoading, error: contasError, loadContas, createConta } = useContas();
    const { categorias, loading: categoriasLoading, loadCategorias, createCategoria } = useCategorias();
    const transacaoService = useTransacaoService();
    const orcamentoService = useOrcamentoService();
    const [submitting, setSubmitting] = useState(false);
    const [orcamentos, setOrcamentos] = useState<Orcamento[]>([]);
    const [orcamentosLoading, setOrcamentosLoading] = useState(false);

    const loadOrcamentos = useCallback(async () => {
        try {
            setOrcamentosLoading(true);
            const result = await orcamentoService.loadOrcamentos(getUserId());
            setOrcamentos(result);
            return result;
        } catch {
            return [];
        } finally {
            setOrcamentosLoading(false);
        }
    }, [orcamentoService, getUserId]);

    useEffect(() => {
        loadOrcamentos();
    }, [loadOrcamentos]);

    const loadTransacoesMes = useCallback(async (contaId: number, mesReferencia: string) => {
        const { year, month } = parseMesReferencia(mesReferencia);
        return transacaoService.loadTransacoesByYearAndMonth(contaId, year, month);
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

    const createOrcamento = useCallback(async (contaId: number, payload: CreateOrcamentoPayload) => {
        setSubmitting(true);
        try {
            const result = await orcamentoService.createOrcamento(contaId, payload);
            await loadContas();
            await loadOrcamentos();
            return result;
        } finally {
            setSubmitting(false);
        }
    }, [orcamentoService, loadContas, loadOrcamentos]);

    return {
        usuario,
        contas,
        categorias,
        orcamentos,
        loading: contasLoading || categoriasLoading || orcamentosLoading,
        error: contasError,
        submitting,
        loadContas,
        loadOrcamentos,
        loadCategorias,
        loadTransacoesMes,
        createTransacao,
        createOrcamento,
        createConta,
        createCategoria,
    };
};
