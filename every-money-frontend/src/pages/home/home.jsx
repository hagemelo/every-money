import React, { useState, useEffect } from 'react';

import HomeStyles from './home.styles';
import PainelFinanceiroSidebar from '../../components/sidebar/painel-financeiro.sidebar.jsx';
import { useHome } from '../../hook/useHome.tsx';
import ListContas from '../../components/select/list-contas.select.jsx';
import OrcamentoCard from '../../components/card/orcamento.card.jsx';

const Home = () => {

  const { HomeContainer } = HomeStyles
  const {usuario, contas, loading, setContas} = useHome();

  const [contaSelecionada, setContaSelecionada] = useState(null);
  const [orcamentos, setOrcamentos] = useState([]);
  const handleContaChange = (novaConta) => {
    setContaSelecionada(novaConta);
  };

  useEffect(() => {
    if (contaSelecionada) {
      const conta = contas.find((conta) => conta.nome === contaSelecionada);
      const orcamentos = conta.orcamentos?.map((orcamento) => ({
        ...orcamento,
        limite: Number(orcamento.limite),
      })) ?? [];
      setOrcamentos(orcamentos);
    }
  }, [contaSelecionada]);

  return (
    <HomeContainer>
    
      <PainelFinanceiroSidebar usuario={usuario}/>
      <main className="main-content">

        <h1>Visão Geral</h1>
        <ListContas contas={contas ?? []} onContaChange={handleContaChange}/>
        
        {contaSelecionada && 
        
       ( orcamentos && orcamentos.length > 0 ? (
          orcamentos.map((orcamento) => (
            <>
            <h1>Orçamentos</h1>
            <OrcamentoCard key={orcamento.id} orcamento={orcamento}/>
            </>
          ))
        ) : null)
      }
        
      </main>

    </HomeContainer>
    )
}

export default Home;