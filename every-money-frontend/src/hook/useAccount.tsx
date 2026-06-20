import { useContas } from './useContas.tsx';
import { useUsuario } from './useUsuario.tsx';

export const useAccount = () => {
    const { usuario } = useUsuario();
    const { contas, loading, error, loadContas, createConta } = useContas();

    return {
        usuario,
        contas,
        loading,
        error,
        loadContas,
        createConta,
    };
};
