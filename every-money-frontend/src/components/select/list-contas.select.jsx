import { useState } from "react";
import { SelectWrapper, Label, Select } from "./list-contas.select.styles.jsx";
import { useHomeService } from '../../share/context/context.tsx';
import { LocalStorageService } from "../../share/storage/local.storage.service.tsx";
import { useEffect } from "react";


function ListContas() {

    const homeService = useHomeService();
    const [conta, setConta] = useState("Selecione uma conta");
    const [loading, setLoading] = useState(false);
    const [contas, setContas] = useState([]);

    async function  loadUserContas() {
        try {
            const localStorageId = new LocalStorageService('userId');
            const userId = localStorageId.getItem()
            const result = await homeService.loadContas(parseInt(userId));
            console.log(result);
            setContas(result);
            return result;
            } catch (err) {
            console.log(err);
        } finally {
            setLoading(false);
        }
        }

    useEffect(() => {
        loadUserContas(); 
    }, []);

  return (
    <SelectWrapper>
      <Label>Conta</Label>
      <Select 
        value={conta} 
        onChange={(e) => setConta(e.target.value)}
        disabled={!contas || !contas.length}
      >
        <option value="">Selecione uma conta</option>
        {contas && contas.length > 0 ? (
          contas.map((conta) => (
            <option key={conta.id} value={conta.nome}>
              {conta.nome}
            </option>
          ))
        ) : (
          <option value="" disabled>Nenhuma conta encontrada</option>
        )}
      </Select>
    </SelectWrapper>
  );
}

export default ListContas;