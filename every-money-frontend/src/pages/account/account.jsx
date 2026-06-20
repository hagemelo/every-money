import { useState } from 'react';
import AppShell from '../../components/layout/app-shell.jsx';
import { useAccount } from '../../hook/useAccount.tsx';
import ContasTable from '../../components/table/contas.table.jsx';
import Button from '../../components/button/button.jsx';
import Modal from '../../components/modal/modal.jsx';
import ContaForm from '../../components/form/conta.form.jsx';
import EmptyState from '../../components/empty-state/empty-state.jsx';
import { useToast } from '../../components/toast/toast.jsx';
import styled from 'styled-components';

const PageHeader = styled.div`
  display: flex;
  justify-content: space-between;
  align-items: center;
  flex-wrap: wrap;
  gap: 1rem;
  margin-bottom: 1rem;
`;

const Account = () => {
    const { usuario, contas, loading, createConta } = useAccount();
    const { showToast } = useToast();
    const [modalConta, setModalConta] = useState(false);

    const handleCreateConta = async (payload) => {
        try {
            await createConta(payload.nome, payload.tipoConta);
            setModalConta(false);
            showToast('Conta criada com sucesso!');
        } catch {
            showToast('Erro ao criar conta.', 'error');
        }
    };

    return (
        <AppShell usuario={usuario}>
                <PageHeader>
                    <h1>Contas</h1>
                    <Button onClick={() => setModalConta(true)}>+ Nova Conta</Button>
                </PageHeader>

                {loading && <p style={{ color: '#6b7280' }}>Carregando...</p>}

                {contas?.length > 0 ? (
                    <ContasTable contas={contas} />
                ) : !loading ? (
                    <EmptyState
                        title="Nenhuma conta cadastrada"
                        message="Crie sua primeira conta para começar."
                        actionLabel="Criar conta"
                        onAction={() => setModalConta(true)}
                    />
                ) : null}

                <Modal
                    isOpen={modalConta}
                    onClose={() => setModalConta(false)}
                    title="Nova Conta"
                    footer={
                        <>
                            <Button variant="secondary" onClick={() => setModalConta(false)}>Cancelar</Button>
                            <Button type="submit" form="conta-form">Salvar</Button>
                        </>
                    }
                >
                    <ContaForm onSubmit={handleCreateConta} />
                </Modal>
        </AppShell>
    );
};

export default Account;
