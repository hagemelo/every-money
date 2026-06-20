import { useState, useEffect, useRef } from "react";
import { SelectWrapper, Label, Select } from "./list-contas.select.styles.jsx";

function ListContas({ contas = [], onContaChange, value, defaultConta }) {
  const contasArray = Array.isArray(contas) ? contas : [];
  const [conta, setConta] = useState(value ?? defaultConta ?? "");
  const hasAutoSelected = useRef(false);
  const onContaChangeRef = useRef(onContaChange);

  useEffect(() => {
    onContaChangeRef.current = onContaChange;
  }, [onContaChange]);

  useEffect(() => {
    const items = Array.isArray(contas) ? contas : [];

    if (value !== undefined && value !== "") {
      setConta(value);
      return;
    }

    if (items.length === 0 || hasAutoSelected.current) return;

    const initial =
      defaultConta && items.some((c) => c.nome === defaultConta)
        ? defaultConta
        : items[0].nome;

    setConta(initial);
    hasAutoSelected.current = true;
    onContaChangeRef.current?.(initial);
  }, [value, contas, defaultConta]);

  const handleContaChange = (e) => {
    const novaConta = e.target.value;
    setConta(novaConta);
    onContaChangeRef.current?.(novaConta);
  };

  return (
    <SelectWrapper>
      <Label>Conta</Label>
      <Select
        value={conta}
        onChange={handleContaChange}
        disabled={!contasArray.length}
      >
        <option value="">Selecione uma conta</option>
        {contasArray.map((c) => (
          <option key={c.id} value={c.nome}>
            {c.nome}
          </option>
        ))}
      </Select>
    </SelectWrapper>
  );
}

export default ListContas;
