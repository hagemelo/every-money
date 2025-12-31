import { useState } from "react";
import { SelectWrapper, Label, Select } from "./list-contas.select.styles.jsx";

function ListContas({ contas = [], onContaChange }) {
    
  const [conta, setConta] = useState("Selecione uma conta");

  const contasArray = Array.isArray(contas) ? contas : [];

  const handleContaChange = (e) => {
    const novaConta = e.target.value;
    setConta(novaConta);
    if (onContaChange) {
      onContaChange(novaConta);
    }
  };


  return (
    <SelectWrapper>
      <Label>Conta</Label>
      <Select 
        value={conta} 
        onChange={handleContaChange}
        disabled={!contasArray || !contasArray.length}
      >
        <option value="">Selecione uma conta</option>
        {contasArray && contasArray.length > 0 ? (
          contasArray.map((conta) => (
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