import { useState } from 'react';
import { FormField, FormInput, FormSelect } from './form-field.jsx';
import { TipoCategoria } from '../../share/domain/enums';
import { getMesReferencia, toMonthInputValue, fromMonthInputValue } from '../../share/utils/date.utils';
import { parseCurrencyInput } from '../../share/utils/currency.utils';

function OrcamentoForm({ mesReferenciaInicial, onSubmit }) {
    const [monthInput, setMonthInput] = useState(
        toMonthInputValue(mesReferenciaInicial || getMesReferencia())
    );
    const [limite, setLimite] = useState('');
    const [tipoCategoria, setTipoCategoria] = useState(TipoCategoria.Saida);
    const [errors, setErrors] = useState({});

    const validate = () => {
        const newErrors = {};
        if (!monthInput) newErrors.mesReferencia = 'Mês é obrigatório';
        const limiteNum = parseCurrencyInput(limite);
        if (limiteNum <= 0) newErrors.limite = 'Limite deve ser maior que zero';
        setErrors(newErrors);
        return Object.keys(newErrors).length === 0;
    };

    const handleSubmit = (e) => {
        e.preventDefault();
        if (!validate()) return;

        onSubmit({
            mesReferencia: fromMonthInputValue(monthInput),
            limite: parseCurrencyInput(limite),
            tipoCategoria,
        });
    };

    return (
        <form id="orcamento-form" onSubmit={handleSubmit}>
            <FormField label="Mês de referência" error={errors.mesReferencia}>
                <FormInput
                    type="month"
                    value={monthInput}
                    onChange={(e) => setMonthInput(e.target.value)}
                />
            </FormField>

            <FormField label="Tipo" >
                <FormSelect
                    value={tipoCategoria}
                    onChange={(e) => setTipoCategoria(e.target.value)}
                >
                    {Object.values(TipoCategoria).map(t => (
                        <option key={t} value={t}>{t}</option>
                    ))}
                </FormSelect>
            </FormField>

            <FormField label="Limite (R$)" error={errors.limite}>
                <FormInput
                    type="text"
                    inputMode="decimal"
                    value={limite}
                    onChange={(e) => setLimite(e.target.value)}
                    placeholder="0,00"
                />
            </FormField>
        </form>
    );
}

export default OrcamentoForm;
