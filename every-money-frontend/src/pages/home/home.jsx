import React, {useEffect} from 'react';

import HomeStyles from './home.styles';
import PainelFinanceiroSidebar from '../../components/sidebar/painel-financeiro.sidebar.jsx';
import { useHome } from '../../hook/useHome.tsx';
import ListContas from '../../components/select/list-contas.select.jsx';

const Home = () => {

  const { HomeContainer } = HomeStyles
  const {usuario, contas, loading, setContas} = useHome();

  
  useEffect(() => {
  if (contas && contas.length > 0) {
    // Faça algo com as contas carregadas
    console.log('Contas carregadas:', contas);
  }
}, [contas]);

  return (
    <HomeContainer>
    
      <PainelFinanceiroSidebar usuario={usuario}/>
      <main className="main-content">

        <h1>Visão Geral</h1>
        <ListContas contas={contas ?? []}/>
      </main>

    </HomeContainer>
    )
}

export default Home;