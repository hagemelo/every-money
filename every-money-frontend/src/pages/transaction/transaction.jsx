import { useState, useEffect, useCallback } from 'react';
import AppShell from '../../components/layout/app-shell.jsx';
import { useTransaction } from '../../hook/useTransaction.tsx';
import ListContas from '../../components/select/list-contas.select.jsx';
import TransacaoTable from '../../components/table/transacoes.table.jsx';
import MonthPicker from '../../components/month-picker/month-picker.jsx';
import Button from '../../components/button/button.jsx';
import Modal from '../../components/modal/modal.jsx';
import TransacaoForm from '../../components/form/transacao.form.jsx';
import CategoriaForm from '../../components/form/categoria.form.jsx';
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

const ControlsRow = styled.div`
  display: flex;
  align-items: flex-end;
  gap: 1.5rem;
  flex-wrap: wrap;
  margin-bottom: 1.5rem;
`;

const Transaction = () => {
    const {
        usuario, contas, categorias, loading, submitting, error,
        loadTransacoesMes, createTransacao, createCategoria, loadCategorias,
    } = useTransaction();
    const { showToast } = useToast();

    const [contaSelecionada, setContaSelecionada] = useState('');
    const [mesReferencia, setMesReferencia] = useState(getMesReferencia());
    const [transacoes, setTransacoes] = useState([]);
    const [modalTransacao, setModalTransacao] = useState(false);
    const [modalCategoria, setModalCategoria] = useState(false);

    const contaAtual = contas?.find(c => c.nome === contaSelecionada);
    const contaId = contaAtual?.id;

    useEffect(() => {
        if (!contaId) {
            setTransacoes([]);
            return;
        }

        let cancelled = false;

        loadTransacoesMes(contaId, mesReferencia)
            .then((result) => {
                if (!cancelled) setTransacoes(result ?? []);
            })
            .catch(() => {
                if (!cancelled) setTransacoes([]);
            });

        return () => { cancelled = true; };
    }, [contaId, mesReferencia, loadTransacoesMes]);

    const refreshTransacoes = useCallback(async () => {
        if (!contaId) {
            setTransacoes([]);
            return;
        }
        const result = await loadTransacoesMes(contaId, mesReferencia);
        setTransacoes(result ?? []);
    }, [contaId, mesReferencia, loadTransacoesMes]);

    const handleCreateTransacao = async (formData) => {
        if (!contaAtual?.id) return;
        try {
            const { categoriaId, ...payload } = formData;
            await createTransacao(contaAtual.id, categoriaId, payload);
            await refreshTransacoes();
            setModalTransacao(false);
            showToast('Transação criada com sucesso!');
        } catch {
            showToast('Erro ao criar transação.', 'error');
        }
    };

    const handleCreateCategoria = async (payload) => {
        try {
            await createCategoria(payload.nome, payload.tipo, payload.classificacao);
            await loadCategorias();
            setModalCategoria(false);
            showToast('Categoria criada com sucesso!');
        } catch {
            showToast('Erro ao criar categoria.', 'error');
        }
    };

    const openModal = () => {
        if (!categorias?.length) {
            setModalCategoria(true);
            return;
        }
        setModalTransacao(true);
    };

    return (
        <AppShell usuario={usuario}>
                <PageHeader>
                    <h1>Transações</h1>
                    <Button onClick={openModal} disabled={!contaSelecionada}>
                        + Nova Transação
                    </Button>
                </PageHeader>

                <ControlsRow>
                    <ListContas
                        contas={contas ?? []}
                        value={contaSelecionada}
                        onContaChange={setContaSelecionada}
                    />
                    <MonthPicker mesReferencia={mesReferencia} onChange={setMesReferencia} />
                </ControlsRow>

                {loading && <p style={{ color: '#6b7280' }}>Carregando...</p>}
                {error && <p style={{ color: '#ef4444' }}>{error}</p>}

                {!contaSelecionada ? (
                    <EmptyState
                        title="Selecione uma conta"
                        message="Escolha uma conta para visualizar as transações."
                    />
                ) : transacoes.length > 0 ? (
                    <TransacaoTable transacoes={transacoes} />
                ) : !loading ? (
                    <EmptyState
                        title="Nenhuma transação neste mês"
                        message="Registre suas receitas e despesas."
                        actionLabel="Nova transação"
                        onAction={openModal}
                    />
                ) : null}

                <Modal
                    isOpen={modalTransacao}
                    onClose={() => setModalTransacao(false)}
                    title="Nova Transação"
                    footer={
                        <>
                            <Button variant="secondary" onClick={() => setModalTransacao(false)}>Cancelar</Button>
                            <Button type="submit" form="transacao-form" disabled={submitting}>
                                {submitting ? 'Salvando...' : 'Salvar'}
                            </Button>
                        </>
                    }
                >
                    <TransacaoForm categorias={categorias} onSubmit={handleCreateTransacao} />
                </Modal>

                <Modal
                    isOpen={modalCategoria}
                    onClose={() => setModalCategoria(false)}
                    title="Nova Categoria"
                    footer={
                        <>
                            <Button variant="secondary" onClick={() => setModalCategoria(false)}>Cancelar</Button>
                            <Button type="submit" form="categoria-form" disabled={submitting}>
                                {submitting ? 'Salvando...' : 'Salvar'}
                            </Button>
                        </>
                    }
                >
                    <CategoriaForm onSubmit={handleCreateCategoria} />
                </Modal>
        </AppShell>
    );
};

export default Transaction;
