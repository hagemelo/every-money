import React, { useState, useEffect } from 'react';
import { DisplayGrid } from './home.styles';
import { MainContainer, MainContent } from '../../components/styles/main.styles.jsx';
import PainelFinanceiroSidebar from '../../components/sidebar/painel-financeiro.sidebar.jsx';
import { useHome } from '../../hook/useHome.tsx';
import ListContas from '../../components/select/list-contas.select.jsx';
import OrcamentoCard from '../../components/card/orcamento.card.jsx';
import SaldoContaCard from '../../components/card/saldo-conta.card.jsx';

const Home = () => {

  const {usuario, contas} = useHome();

  const [contaSelecionada, setContaSelecionada] = useState(null);
  const [orcamentos, setOrcamentos] = useState([]);

  const [saldoPrevisto, setSaldoPrevisto] = useState([]);
  const [saldoRealizado, setSaldoRealizado] = useState([]);

  const handleContaChange = (novaConta) => {
    setContaSelecionada(novaConta);
  };

  useEffect(() => {
    if (contaSelecionada) {
      console.log('Passou aqui');
      const conta = contas.find((conta) => conta.nome === contaSelecionada);
      const orcamentos = conta.orcamentos?.map((orcamento) => ({
        ...orcamento,
        limite: Number(orcamento.limite),
      })) ?? [];
      setOrcamentos(orcamentos);

      const saldoPrevisto = {
        saldo: conta.saldoPrevisto,
        nome: 'Saldo Previsto',
        background: 'linear-gradient(135deg, #6bb3f7ff, #6bb3f7ff)'
      };
      const saldoRealizado = {
        saldo: conta.saldoRealizado,
        nome: 'Saldo Realizado',
        background: 'linear-gradient(135deg, #918f8dff, #918f8dff)'
      };

      setSaldoPrevisto(saldoPrevisto);
      setSaldoRealizado(saldoRealizado);
    }
  }, [contaSelecionada]);

  return (
    <MainContainer>
      <PainelFinanceiroSidebar usuario={usuario} />
      <MainContent>
        <h1>Visão Geral</h1>
        <ListContas contas={contas ?? []} onContaChange={handleContaChange} />
        
        <h3>Orçamentos</h3>
        {contaSelecionada && (
          orcamentos && orcamentos.length > 0 ? (
            <DisplayGrid>
              {orcamentos.map((orcamento) => (
                <OrcamentoCard key={orcamento.id} orcamento={orcamento} />
              ))}
            </DisplayGrid>
          ) : (
            <p>Nenhum orçamento encontrado</p>
          )
        )}
        <h3>Saldos</h3>
        {contaSelecionada && (
          <DisplayGrid>
            <SaldoContaCard saldoConta={saldoPrevisto} />
            <SaldoContaCard saldoConta={saldoRealizado} />
          </DisplayGrid>
        )}
      </MainContent>
    </MainContainer>
  )
}

export default Home;