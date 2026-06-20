import { useState } from 'react';
import { FormField, FormInput, FormSelect } from './form-field.jsx';
import { ClassificacaoCategoria, TipoCategoria } from '../../share/domain/enums';

function CategoriaForm({ onSubmit, tipoInicial }) {
    const [nome, setNome] = useState('');
    const [tipo, setTipo] = useState(tipoInicial || TipoCategoria.Saida);
    const [classificacao, setClassificacao] = useState(ClassificacaoCategoria.OutrosGastos);
    const [errors, setErrors] = useState({});

    const classificacoes = tipo === TipoCategoria.Entrada
        ? [ClassificacaoCategoria.RendaPrincipal, ClassificacaoCategoria.RendaExtra,
           ClassificacaoCategoria.ReceitaDeInvestimento, ClassificacaoCategoria.OutrosReceitas]
        : Object.values(ClassificacaoCategoria).filter(c =>
            ![ClassificacaoCategoria.RendaPrincipal, ClassificacaoCategoria.RendaExtra,
              ClassificacaoCategoria.ReceitaDeInvestimento, ClassificacaoCategoria.OutrosReceitas].includes(c)
          );

    const validate = () => {
        const newErrors = {};
        if (!nome.trim()) newErrors.nome = 'Nome é obrigatório';
        setErrors(newErrors);
        return Object.keys(newErrors).length === 0;
    };

    const handleSubmit = (e) => {
        e.preventDefault();
        if (!validate()) return;
        onSubmit({ nome: nome.trim(), tipo, classificacao });
    };

    return (
        <form id="categoria-form" onSubmit={handleSubmit}>
            <FormField label="Nome" error={errors.nome}>
                <FormInput
                    value={nome}
                    onChange={(e) => setNome(e.target.value)}
                    placeholder="Ex: Supermercado"
                />
            </FormField>

            <FormField label="Tipo">
                <FormSelect value={tipo} onChange={(e) => setTipo(e.target.value)}>
                    {Object.values(TipoCategoria).map(t => (
                        <option key={t} value={t}>{t}</option>
                    ))}
                </FormSelect>
            </FormField>

            <FormField label="Classificação">
                <FormSelect value={classificacao} onChange={(e) => setClassificacao(e.target.value)}>
                    {classificacoes.map(c => (
                        <option key={c} value={c}>{c}</option>
                    ))}
                </FormSelect>
            </FormField>
        </form>
    );
}

export default CategoriaForm;
