import { useMemo } from 'react';
import { BackendApi } from "../../api/backend-api.tsx";
import { CategoriaService } from "../../service/categoria.service.tsx";
import { ContaService } from "../../service/conta.service.tsx";
import { LoginService } from "../../service/login.service.tsx";
import { OrcamentoService } from "../../service/orcamento.service.tsx";
import { TransacaoService } from "../../service/transacao.service.tsx";
import { LocalStorageService } from "../storage/local.storage.service.tsx";

const sharedBackendApi = new BackendApi();

export function useLocalStorage(key: string) {
    return useMemo(() => ({
        localStorageService: new LocalStorageService(key),
    }), [key]);
}

export function useBackendApi() {
    return useMemo(() => ({ backendApi: sharedBackendApi }), []);
}

export function useLoginService() {
    return useMemo(() => new LoginService(sharedBackendApi), []);
}

export function useContaService() {
    return useMemo(() => new ContaService(sharedBackendApi), []);
}

export function useOrcamentoService() {
    return useMemo(() => new OrcamentoService(sharedBackendApi), []);
}

export function useCategoriaService() {
    return useMemo(() => new CategoriaService(sharedBackendApi), []);
}

export function useTransacaoService() {
    return useMemo(() => new TransacaoService(sharedBackendApi), []);
}
