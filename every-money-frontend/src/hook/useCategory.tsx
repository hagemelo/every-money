import { useCategorias } from './useCategorias.tsx';
import { useUsuario } from './useUsuario.tsx';

export const useCategory = () => {
    const { usuario } = useUsuario();
    const { categorias, loading, error, loadCategorias, createCategoria } = useCategorias();

    return {
        usuario,
        categorias,
        loading,
        error,
        loadCategorias,
        createCategoria,
    };
};
