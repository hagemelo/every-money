import { useState, useMemo } from 'react';
import { FormField, FormInput, FormSelect, FormRow } from './form-field.jsx';
import { StatusTransacao, TipoTransacao } from '../../share/domain/enums';
import { getMesReferenciaFromDate, toInputDate } from '../../share/utils/date.utils';
import { parseCurrencyInput } from '../../share/utils/currency.utils';

function TransacaoForm({ categorias = [], onSubmit, submitting = false }) {
    const [descricao, setDescricao] = useState('');
    const [valor, setValor] = useState('');
    const [data, setData] = useState(toInputDate());
    const [tipo, setTipo] = useState(TipoTransacao.Saida);
    const [status, setStatus] = useState(StatusTransacao.Avencer);
    const [categoriaId, setCategoriaId] = useState('');
    const [errors, setErrors] = useState({});

    const categoriasFiltradas = useMemo(
        () => categorias.filter(c => c.tipo === tipo),
        [categorias, tipo]
    );

    const validate = () => {
        const newErrors = {};
        if (!descricao.trim()) newErrors.descricao = 'Descrição é obrigatória';
        const valorNum = parseCurrencyInput(valor);
        if (valorNum <= 0) newErrors.valor = 'Valor deve ser maior que zero';
        if (!categoriaId) newErrors.categoriaId = 'Selecione uma categoria';
        if (!data) newErrors.data = 'Data é obrigatória';
        setErrors(newErrors);
        return Object.keys(newErrors).length === 0;
    };

    const handleSubmit = (e) => {
        e.preventDefault();
        if (!validate()) return;

        onSubmit({
            descricao: descricao.trim(),
            valor: parseCurrencyInput(valor),
            data,
            mesReferencia: getMesReferenciaFromDate(data),
            tipo,
            status,
            categoriaId: parseInt(categoriaId, 10),
        });
    };

    return (
        <form id="transacao-form" onSubmit={handleSubmit}>
            <FormField label="Descrição" error={errors.descricao}>
                <FormInput
                    value={descricao}
                    onChange={(e) => setDescricao(e.target.value)}
                    placeholder="Ex: Compra no mercado"
                />
            </FormField>

            <FormRow>
                <FormField label="Valor (R$)" error={errors.valor}>
                    <FormInput
                        type="text"
                        inputMode="decimal"
                        value={valor}
                        onChange={(e) => setValor(e.target.value)}
                        placeholder="0,00"
                    />
                </FormField>
                <FormField label="Data" error={errors.data}>
                    <FormInput
                        type="date"
                        value={data}
                        onChange={(e) => setData(e.target.value)}
                    />
                </FormField>
            </FormRow>

            <FormRow>
                <FormField label="Tipo">
                    <FormSelect
                        value={tipo}
                        onChange={(e) => {
                            setTipo(e.target.value);
                            setCategoriaId('');
                        }}
                    >
                        {Object.values(TipoTransacao).map(t => (
                            <option key={t} value={t}>{t}</option>
                        ))}
                    </FormSelect>
                </FormField>
                <FormField label="Status">
                    <FormSelect value={status} onChange={(e) => setStatus(e.target.value)}>
                        {Object.values(StatusTransacao).map(s => (
                            <option key={s} value={s}>{s}</option>
                        ))}
                    </FormSelect>
                </FormField>
            </FormRow>

            <FormField label="Categoria" error={errors.categoriaId}>
                <FormSelect
                    value={categoriaId}
                    onChange={(e) => setCategoriaId(e.target.value)}
                >
                    <option value="">Selecione uma categoria</option>
                    {categoriasFiltradas.map(c => (
                        <option key={c.id} value={c.id}>
                            {c.classificacao} / {c.nome}
                        </option>
                    ))}
                </FormSelect>
            </FormField>

            {categoriasFiltradas.length === 0 && (
                <p style={{ color: '#6b7280', fontSize: '0.85rem', marginTop: '-0.5rem' }}>
                    Nenhuma categoria do tipo {tipo}. Crie uma categoria primeiro.
                </p>
            )}
        </form>
    );
}

export default TransacaoForm;
