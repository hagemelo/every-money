import React, { useState, useEffect, useCallback, useMemo } from 'react';
import { Link } from 'react-router-dom';
import { FiArrowDownLeft, FiArrowUpRight } from 'react-icons/fi';
import {
  PageToolbar,
  ToolbarGreeting,
  GreetingTitle,
  GreetingSubtitle,
  ToolbarRow,
  ToolbarFilters,
  ToolbarActions,
  HomeDashboard,
  SectionCard,
  SectionHeader,
  SectionTitle,
  DisplayGrid,
  ErrorMessage,
  RecentList,
  RecentItem,
  TransactionIcon,
  RecentContent,
  RecentDesc,
  RecentMeta,
  RecentValue,
  ViewAllLink,
  SkeletonKpiGrid,
  SkeletonBlock,
  SkeletonCard,
} from './home.styles';
import AppShell from '../../components/layout/app-shell.jsx';
import { useHome } from '../../hook/useHome.tsx';
import ListContas from '../../components/select/list-contas.select.jsx';
import OrcamentoCard from '../../components/card/orcamento.card.jsx';
import KpiCard from '../../components/card/kpi.card.jsx';
import { KpiGrid } from '../../components/card/kpi.card.styles.jsx';
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

const KPI_BACKGROUNDS = {
  realizado: 'linear-gradient(135deg, rgb(21, 107, 122), rgb(15, 80, 92))',
  previsto: 'linear-gradient(135deg, rgb(41, 162, 184), rgb(30, 130, 150))',
  entradas: 'linear-gradient(135deg, #34d399, #10b981)',
  saidas: 'linear-gradient(135deg, #f87171, #ef4444)',
};

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

  const { entradasMes, saidasMes } = useMemo(() => {
    const entradas = transacoes
      .filter(t => t.tipo === 'Entrada')
      .reduce((sum, t) => sum + Number(t.valor), 0);
    const saidas = transacoes
      .filter(t => t.tipo === 'Saída')
      .reduce((sum, t) => sum + Number(t.valor), 0);
    return { entradasMes: entradas, saidasMes: saidas };
  }, [transacoes]);

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

  const firstName = usuario?.name?.split(' ')[0] ?? 'usuário';

  return (
    <AppShell usuario={usuario}>
      <PageToolbar>
        <ToolbarGreeting>
          <GreetingTitle>Olá, {firstName}</GreetingTitle>
          <GreetingSubtitle>Visão geral da sua conta</GreetingSubtitle>
        </ToolbarGreeting>

        {!loading && contas?.length > 0 && (
          <ToolbarRow>
            <ToolbarFilters>
              <ListContas
                contas={contas ?? []}
                value={contaSelecionada}
                onContaChange={setContaSelecionada}
              />
              <MonthPicker mesReferencia={mesReferencia} onChange={setMesReferencia} />
            </ToolbarFilters>
            <ToolbarActions>
              <ButtonGroup>
                <Button onClick={openTransacaoModal}>+ Nova Transação</Button>
                <Button
                  variant="secondary"
                  onClick={() => contaAtual ? setModalOrcamento(true) : setModalConta(true)}
                >
                  + Orçamento
                </Button>
              </ButtonGroup>
            </ToolbarActions>
          </ToolbarRow>
        )}
      </PageToolbar>

      {error && <ErrorMessage>{error}</ErrorMessage>}

      {loading && (
        <>
          <SkeletonKpiGrid>
            {[1, 2, 3, 4].map(i => (
              <SkeletonBlock key={i} $height="88px" $radius="12px" />
            ))}
          </SkeletonKpiGrid>
          <SkeletonCard>
            <SkeletonBlock $height="1.25rem" $width="40%" />
            <SkeletonBlock $height="120px" style={{ marginTop: '1rem' }} />
          </SkeletonCard>
        </>
      )}

      {!loading && !contas?.length ? (
        <EmptyState
          title="Nenhuma conta cadastrada"
          message="Crie sua primeira conta para começar a gerenciar suas finanças."
          actionLabel="Criar conta"
          onAction={() => setModalConta(true)}
        />
      ) : !loading && contaSelecionada && (
        <>
          <KpiGrid>
            <KpiCard
              label="Saldo Realizado"
              value={contaAtual?.saldoRealizado}
              background={KPI_BACKGROUNDS.realizado}
            />
            <KpiCard
              label="Saldo Previsto"
              value={contaAtual?.saldoPrevisto}
              background={KPI_BACKGROUNDS.previsto}
            />
            <KpiCard
              label="Entradas do mês"
              value={entradasMes}
              background={KPI_BACKGROUNDS.entradas}
            />
            <KpiCard
              label="Saídas do mês"
              value={saidasMes}
              background={KPI_BACKGROUNDS.saidas}
            />
          </KpiGrid>

          <HomeDashboard>
            <SectionCard>
              <SectionHeader>
                <SectionTitle>Orçamentos</SectionTitle>
              </SectionHeader>
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
            </SectionCard>

            <SectionCard>
              <SectionHeader>
                <SectionTitle>Últimas transações</SectionTitle>
                <ViewAllLink as={Link} to="/transaction">Ver todas →</ViewAllLink>
              </SectionHeader>
              {recentTransacoes.length > 0 ? (
                <RecentList>
                  {recentTransacoes.map(t => (
                    <RecentItem key={t.id}>
                      <TransactionIcon $tipo={t.tipo}>
                        {t.tipo === 'Entrada'
                          ? <FiArrowDownLeft size={16} />
                          : <FiArrowUpRight size={16} />}
                      </TransactionIcon>
                      <RecentContent>
                        <RecentDesc>{t.descricao}</RecentDesc>
                        <RecentMeta>
                          <DateLabel date={t.data} /> · {t.categoria?.nome}
                        </RecentMeta>
                      </RecentContent>
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
            </SectionCard>
          </HomeDashboard>
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
    </AppShell>
  );
};

export default Home;
