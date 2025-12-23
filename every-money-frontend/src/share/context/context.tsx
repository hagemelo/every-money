import { BackendApi } from "../../api/backend-api.tsx";
import { HomeService } from "../../service/home.service.tsx";
import { LoginService } from "../../service/login.service.tsx";
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

export function useHomeService() {
    const { backendApi } = useBackendApi();
    return new HomeService(backendApi);
}
