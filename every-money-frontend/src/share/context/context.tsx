import { BackendApi } from "../../api/backend-api.tsx";
import { CategoriaService } from "../../service/categoria.service.tsx";
import { ContaService } from "../../service/conta.service.tsx";
import { LoginService } from "../../service/login.service.tsx";
import { OrcamentoService } from "../../service/orcamento.service.tsx";
import { TransacaoService } from "../../service/transacao.service.tsx";
import { LocalStorageService } from "../storage/local.storage.service.tsx";

export function useLocalStorage(key: string) {
    return {
      localStorageService: new LocalStorageService(key),
    };
}

export function useBackendApi() {
    return {
      backendApi: new BackendApi(),
    };
}

export function useLoginService() {
    const { backendApi } = useBackendApi();
    return new LoginService(backendApi);
}

export function useContaService() {
    const { backendApi } = useBackendApi();
    return new ContaService(backendApi);
}

export function useOrcamentoService() {
    const { backendApi } = useBackendApi();
    return new OrcamentoService(backendApi);
}

export function useCategoriaService() {
    const { backendApi } = useBackendApi();
    return new CategoriaService(backendApi);
}

export function useTransacaoService() {
    const { backendApi } = useBackendApi();
    return new TransacaoService(backendApi);
}