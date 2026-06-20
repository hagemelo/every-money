import { useState } from 'react';
import AppShell from '../../components/layout/app-shell.jsx';
import { useBudget } from '../../hook/useBudget.tsx';
import OrcamentoTable from '../../components/table/orcamento.table.jsx';
import ListContas from '../../components/select/list-contas.select.jsx';
import Button from '../../components/button/button.jsx';
import Modal from '../../components/modal/modal.jsx';
import OrcamentoForm from '../../components/form/orcamento.form.jsx';
import EmptyState from '../../components/empty-state/empty-state.jsx';
import { useToast } from '../../components/toast/toast.jsx';
import { getMesReferencia } from '../../share/utils/date.utils';
import styled from 'styled-components';

const PageHeader = styled.div`
  display: flex;
  justify-content: space-between;
  align-items: center;
  flex-wrap: wrap;
  gap: 1rem;
  margin-bottom: 1rem;
`;

const FilterRow = styled.div`
  margin-bottom: 1.5rem;
  max-width: 300px;
`;

const Budget = () => {
    const { usuario, contas, orcamentos, loading, submitting, error, createOrcamento } = useBudget();
    const { showToast } = useToast();

    const [contaFiltro, setContaFiltro] = useState('');
    const [modalOrcamento, setModalOrcamento] = useState(false);

    const contaAtual = contas?.find(c => c.nome === contaFiltro);

    const orcamentosFiltrados = contaFiltro
        ? orcamentos.filter(o => o.conta?.nome === contaFiltro)
        : orcamentos;

    const handleCreateOrcamento = async (payload) => {
        const conta = contaAtual ?? contas?.[0];
        if (!conta?.id) {
            showToast('Selecione uma conta primeiro.', 'error');
            return;
        }
        try {
            await createOrcamento(conta.id, payload);
            setModalOrcamento(false);
            showToast('Orçamento criado com sucesso!');
        } catch {
            showToast('Erro ao criar orçamento.', 'error');
        }
    };

    return (
        <AppShell usuario={usuario}>
                <PageHeader>
                    <h1>Orçamentos</h1>
                    <Button onClick={() => setModalOrcamento(true)} disabled={!contas?.length}>
                        + Novo Orçamento
                    </Button>
                </PageHeader>

                <FilterRow>
                    <ListContas
                        contas={contas ?? []}
                        value={contaFiltro}
                        onContaChange={setContaFiltro}
                    />
                </FilterRow>

                {loading && <p style={{ color: '#6b7280' }}>Carregando...</p>}
                {error && <p style={{ color: '#ef4444' }}>{error}</p>}

                {orcamentosFiltrados.length > 0 ? (
                    <OrcamentoTable orcamentos={orcamentosFiltrados} />
                ) : !loading ? (
                    <EmptyState
                        title="Nenhum orçamento encontrado"
                        message="Crie orçamentos para controlar seus gastos e receitas."
                        actionLabel="Criar orçamento"
                        onAction={() => setModalOrcamento(true)}
                    />
                ) : null}

                <Modal
                    isOpen={modalOrcamento}
                    onClose={() => setModalOrcamento(false)}
                    title="Novo Orçamento"
                    footer={
                        <>
                            <Button variant="secondary" onClick={() => setModalOrcamento(false)}>Cancelar</Button>
                            <Button type="submit" form="orcamento-form" disabled={submitting}>
                                {submitting ? 'Salvando...' : 'Salvar'}
                            </Button>
                        </>
                    }
                >
                    {!contaFiltro && contas?.length > 1 && (
                        <FilterRow>
                            <ListContas contas={contas} value={contaFiltro} onContaChange={setContaFiltro} />
                        </FilterRow>
                    )}
                    <OrcamentoForm mesReferenciaInicial={getMesReferencia()} onSubmit={handleCreateOrcamento} />
                </Modal>
        </AppShell>
    );
};

export default Budget;
