import { useState, useEffect, useCallback } from 'react';
import { useCategoriaService } from '../share/context/context.tsx';
import { Categoria } from '../share/domain/categoria.tsx';
import { useUsuario } from './useUsuario.tsx';

export function useCategorias() {
    const categoriaService = useCategoriaService();
    const { getUserId } = useUsuario();
    const [categorias, setCategorias] = useState<Categoria[]>([]);
    const [loading, setLoading] = useState(true);
    const [error, setError] = useState<string | null>(null);

    const loadCategorias = useCallback(async () => {
        try {
            setLoading(true);
            setError(null);
            const result = await categoriaService.loadCategorias(getUserId());
            setCategorias(result);
            return result;
        } catch {
            setError('Não foi possível carregar as categorias.');
            return [];
        } finally {
            setLoading(false);
        }
    }, [categoriaService, getUserId]);

    const createCategoria = useCallback(
        async (nome: string, tipo: string, classificacao: string) => {
            const userId = getUserId();
            const categoria = await categoriaService.createCategoria(
                { nome, tipo, classificacao },
                userId
            );
            await loadCategorias();
            return categoria;
        },
        [categoriaService, getUserId, loadCategorias]
    );

    useEffect(() => {
        loadCategorias();
    }, [loadCategorias]);

    return { categorias, loading, error, loadCategorias, createCategoria, setCategorias };
}
