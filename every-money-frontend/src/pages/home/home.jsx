import React, { useState, useEffect, useCallback } from 'react';
import { Link } from 'react-router-dom';
import {
  DisplayGrid,
  HomeHeader,
  HomeControls,
  HomeLayout,
  HomeMainColumn,
  HomeSideColumn,
  SectionHeader,
  LoadingMessage,
  ErrorMessage,
  RecentList,
  RecentItem,
  RecentDesc,
  RecentMeta,
  RecentValue,
  ViewAllLink,
} from './home.styles';
import { MainContainer, MainContent } from '../../components/styles/main.styles.jsx';
import PainelFinanceiroSidebar from '../../components/sidebar/painel-financeiro.sidebar.jsx';
import { useHome } from '../../hook/useHome.tsx';
import ListContas from '../../components/select/list-contas.select.jsx';
import OrcamentoCard from '../../components/card/orcamento.card.jsx';
import SaldoContaCard from '../../components/card/saldo-conta.card.jsx';
import MonthPicker from '../../components/month-picker/month-picker.jsx';
import Button, { ButtonGroup } from '../../components/button/button.jsx';
import Modal from '../../components/modal/modal.jsx';
import TransacaoForm from '../../components/form/transacao.form.jsx';
import OrcamentoForm from '../../components/form/orcamento.form.jsx';
import ContaForm from '../../components/form/conta.form.jsx';
import CategoriaForm from '../../components/form/categoria.form.jsx';
import EmptyState from '../../components/empty-state/empty-state.jsx';
import { useToast } from '../../components/toast/toast.jsx';
import { getMesReferencia, mesReferenciaEquals } from '../../share/utils/date.utils';
import { calcularGastoOrcamento } from '../../share/utils/budget.utils';
import { formatCurrency } from '../../share/utils/currency.utils';
import DateLabel from '../../components/label/date.label';

const Home = () => {
  const {
    usuario, contas, categorias, orcamentos: todosOrcamentos, loading, error, submitting,
    loadContas, loadCategorias, loadTransacoesMes,
    createTransacao, createOrcamento, createConta, createCategoria,
  } = useHome();
  const { showToast } = useToast();

  const [contaSelecionada, setContaSelecionada] = useState('');
  const [mesReferencia, setMesReferencia] = useState(getMesReferencia());
  const [transacoes, setTransacoes] = useState([]);
  const [modalTransacao, setModalTransacao] = useState(false);
  const [modalOrcamento, setModalOrcamento] = useState(false);
  const [modalConta, setModalConta] = useState(false);
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
    if (!contaId) return;
    const result = await loadTransacoesMes(contaId, mesReferencia);
    setTransacoes(result ?? []);
  }, [contaId, mesReferencia, loadTransacoesMes]);

  const orcamentos = todosOrcamentos
    ?.filter(o =>
      (o.conta?.id === contaId || o.conta?.nome === contaSelecionada) &&
      mesReferenciaEquals(o.mesReferencia, mesReferencia)
    )
    ?.map(o => ({ ...o, limite: Number(o.limite) })) ?? [];

  const saldoPrevisto = contaAtual ? {
    saldo: contaAtual.saldoPrevisto,
    nome: 'Saldo Previsto',
    background: 'linear-gradient(135deg, #6bb3f7ff, #6bb3f7ff)',
  } : null;

  const saldoRealizado = contaAtual ? {
    saldo: contaAtual.saldoRealizado,
    nome: 'Saldo Realizado',
    background: 'linear-gradient(135deg, #918f8dff, #918f8dff)',
  } : null;

  const recentTransacoes = transacoes.slice(0, 5);

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

  const handleCreateOrcamento = async (payload) => {
    if (!contaAtual?.id) return;
    try {
      await createOrcamento(contaAtual.id, payload);
      await loadContas();
      setModalOrcamento(false);
      showToast('Orçamento criado com sucesso!');
    } catch {
      showToast('Erro ao criar orçamento.', 'error');
    }
  };

  const handleCreateConta = async (payload) => {
    try {
      const conta = await createConta(payload.nome, payload.tipoConta);
      setModalConta(false);
      setContaSelecionada(conta.nome);
      showToast('Conta criada com sucesso!');
    } catch {
      showToast('Erro ao criar conta.', 'error');
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

  const openTransacaoModal = () => {
    if (!contas?.length) { setModalConta(true); return; }
    if (!categorias?.length) { setModalCategoria(true); return; }
    setModalTransacao(true);
  };

  return (
    <MainContainer>
      <PainelFinanceiroSidebar usuario={usuario} />
      <MainContent>
        <HomeHeader>
          <h1>Visão Geral</h1>
          <ButtonGroup>
            <Button onClick={openTransacaoModal}>+ Nova Transação</Button>
            <Button onClick={() => contaAtual ? setModalOrcamento(true) : setModalConta(true)}>
              + Novo Orçamento
            </Button>
          </ButtonGroup>
        </HomeHeader>

        {error && <ErrorMessage>{error}</ErrorMessage>}
        {loading && <LoadingMessage>Carregando...</LoadingMessage>}

        {!loading && !contas?.length ? (
          <EmptyState
            title="Nenhuma conta cadastrada"
            message="Crie sua primeira conta para começar a gerenciar suas finanças."
            actionLabel="Criar conta"
            onAction={() => setModalConta(true)}
          />
        ) : (
          <>
            <HomeControls>
              <ListContas
                contas={contas ?? []}
                value={contaSelecionada}
                onContaChange={setContaSelecionada}
              />
              <MonthPicker mesReferencia={mesReferencia} onChange={setMesReferencia} />
            </HomeControls>

            {contaSelecionada && (
              <HomeLayout>
                <HomeMainColumn>
                  <h3>Orçamentos</h3>
                  {orcamentos.length > 0 ? (
                    <DisplayGrid>
                      {orcamentos.map(orcamento => (
                        <OrcamentoCard
                          key={orcamento.id}
                          orcamento={orcamento}
                          gasto={calcularGastoOrcamento(transacoes, orcamento, mesReferencia)}
                        />
                      ))}
                    </DisplayGrid>
                  ) : (
                    <EmptyState
                      title="Nenhum orçamento neste mês"
                      message="Defina um limite de gastos ou receitas para acompanhar seu progresso."
                      actionLabel="Criar orçamento"
                      onAction={() => setModalOrcamento(true)}
                    />
                  )}
                </HomeMainColumn>

                <HomeSideColumn>
                  <h3>Saldos</h3>
                  <DisplayGrid>
                    {saldoPrevisto && <SaldoContaCard saldoConta={saldoPrevisto} />}
                    {saldoRealizado && <SaldoContaCard saldoConta={saldoRealizado} />}
                  </DisplayGrid>
                </HomeSideColumn>
              </HomeLayout>
            )}

            {contaSelecionada && (
              <>
                <SectionHeader>
                  <h3>Últimas transações</h3>
                  <ViewAllLink as={Link} to="/transaction">Ver todas →</ViewAllLink>
                </SectionHeader>
                {recentTransacoes.length > 0 ? (
                  <RecentList>
                    {recentTransacoes.map(t => (
                      <RecentItem key={t.id}>
                        <div>
                          <RecentDesc>{t.descricao}</RecentDesc>
                          <RecentMeta>
                            <DateLabel date={t.data} /> · {t.categoria?.nome}
                          </RecentMeta>
                        </div>
                        <RecentValue $tipo={t.tipo}>
                          {t.tipo === 'Entrada' ? '+' : '-'}{formatCurrency(Number(t.valor))}
                        </RecentValue>
                      </RecentItem>
                    ))}
                  </RecentList>
                ) : (
                  <EmptyState
                    title="Nenhuma transação neste mês"
                    message="Registre suas receitas e despesas para acompanhar seu saldo."
                    actionLabel="Nova transação"
                    onAction={openTransacaoModal}
                  />
                )}
              </>
            )}
          </>
        )}

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
          {categorias?.length === 0 && (
            <Button variant="secondary" onClick={() => { setModalTransacao(false); setModalCategoria(true); }}>
              Criar categoria
            </Button>
          )}
        </Modal>

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
          <OrcamentoForm mesReferenciaInicial={mesReferencia} onSubmit={handleCreateOrcamento} />
        </Modal>

        <Modal
          isOpen={modalConta}
                onClose={() => setModalConta(false)}
          title="Nova Conta"
          footer={
            <>
              <Button variant="secondary" onClick={() => setModalConta(false)}>Cancelar</Button>
              <Button type="submit" form="conta-form" disabled={submitting}>
                {submitting ? 'Salvando...' : 'Salvar'}
              </Button>
            </>
          }
        >
          <ContaForm onSubmit={handleCreateConta} />
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
      </MainContent>
    </MainContainer>
  );
};

export default Home;
