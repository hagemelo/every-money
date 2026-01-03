import { useState, useEffect } from 'react';
import { LocalStorageService } from "../share/storage/local.storage.service.tsx";
import { useCategoriaService } from '../share/context/context.tsx';
import { Categoria } from '../share/domain/categoria.tsx';

export const useCategory = () => {

    const categoriaService = useCategoriaService();
    const localStorageName = new LocalStorageService('userName');
    const localStorageEmail = new LocalStorageService('userEmail');
    const [categorias, setCategorias] =useState<Categoria[]>([]);
    const [loading, setLoading] = useState(false);

    const localStorageUser = {
        name: localStorageName.getItem(),
        email: localStorageEmail.getItem()
    }

    const [usuario, setUsuario] = useState(localStorageUser);

    async function  loadUserCategorias() {
      try {
          const localStorageId = new LocalStorageService('userId');
          const userId = localStorageId.getItem() ?? '0';
          const result = await categoriaService.loadCategorias(parseInt(userId));
    
          setCategorias(result);
          return result;
          } catch (err) {

      } finally {
          setLoading(false);
      }
    }

    useEffect(() => {
        loadUserCategorias(); 
    }, []);

    return {
        usuario,
        categorias,
        setCategorias,
        setUsuario,
    };
    
}