import { useState } from 'react';
import { FormField, FormInput, FormSelect } from './form-field.jsx';
import { TipoConta } from '../../share/domain/enums';

function ContaForm({ onSubmit }) {
    const [nome, setNome] = useState('');
    const [tipoConta, setTipoConta] = useState(TipoConta.Corrente);
    const [errors, setErrors] = useState({});

    const validate = () => {
        const newErrors = {};
        if (!nome.trim()) newErrors.nome = 'Nome é obrigatório';
        setErrors(newErrors);
        return Object.keys(newErrors).length === 0;
    };

    const handleSubmit = (e) => {
        e.preventDefault();
        if (!validate()) return;
        onSubmit({ nome: nome.trim(), tipoConta });
    };

    return (
        <form id="conta-form" onSubmit={handleSubmit}>
            <FormField label="Nome da conta" error={errors.nome}>
                <FormInput
                    value={nome}
                    onChange={(e) => setNome(e.target.value)}
                    placeholder="Ex: Conta Corrente"
                />
            </FormField>

            <FormField label="Tipo de conta">
                <FormSelect value={tipoConta} onChange={(e) => setTipoConta(e.target.value)}>
                    {Object.values(TipoConta).map(t => (
                        <option key={t} value={t}>{t}</option>
                    ))}
                </FormSelect>
            </FormField>
        </form>
    );
}

export default ContaForm;
