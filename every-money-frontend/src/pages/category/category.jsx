import { useState } from 'react';
import { MainContainer, MainContent } from '../../components/styles/main.styles.jsx';
import PainelFinanceiroSidebar from '../../components/sidebar/painel-financeiro.sidebar.jsx';
import { useCategory } from '../../hook/useCategory.tsx';
import CategoriasTable from '../../components/table/categorias.table.jsx';
import Button from '../../components/button/button.jsx';
import Modal from '../../components/modal/modal.jsx';
import CategoriaForm from '../../components/form/categoria.form.jsx';
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

const Category = () => {
    const { usuario, categorias, loading, createCategoria } = useCategory();
    const { showToast } = useToast();
    const [modalCategoria, setModalCategoria] = useState(false);

    const handleCreateCategoria = async (payload) => {
        try {
            await createCategoria(payload.nome, payload.tipo, payload.classificacao);
            setModalCategoria(false);
            showToast('Categoria criada com sucesso!');
        } catch {
            showToast('Erro ao criar categoria.', 'error');
        }
    };

    return (
        <MainContainer>
            <PainelFinanceiroSidebar usuario={usuario} />
            <MainContent>
                <PageHeader>
                    <h1>Categorias</h1>
                    <Button onClick={() => setModalCategoria(true)}>+ Nova Categoria</Button>
                </PageHeader>

                {loading && <p style={{ color: '#6b7280' }}>Carregando...</p>}

                {categorias?.length > 0 ? (
                    <CategoriasTable categorias={categorias} />
                ) : !loading ? (
                    <EmptyState
                        title="Nenhuma categoria cadastrada"
                        message="Crie categorias para classificar suas transações."
                        actionLabel="Criar categoria"
                        onAction={() => setModalCategoria(true)}
                    />
                ) : null}

                <Modal
                    isOpen={modalCategoria}
                    onClose={() => setModalCategoria(false)}
                    title="Nova Categoria"
                    footer={
                        <>
                            <Button variant="secondary" onClick={() => setModalCategoria(false)}>Cancelar</Button>
                            <Button type="submit" form="categoria-form">Salvar</Button>
                        </>
                    }
                >
                    <CategoriaForm onSubmit={handleCreateCategoria} />
                </Modal>
            </MainContent>
        </MainContainer>
    );
};

export default Category;
