import React, {useEffect} from 'react';

import HomeStyles from './home.styles';
import PainelFinanceiroSidebar from '../../components/sidebar/painel-financeiro.sidebar.jsx';
import { useHome } from '../../hook/useHome.tsx';

const Home = () => {

  const { HomeContainer } = HomeStyles
  const {usuario, contas, loading, error, loadContas} = useHome();
 

  return (
    <HomeContainer>
    
      <PainelFinanceiroSidebar usuario={usuario}/>
      <main className="main-content">

        <h1>Visão Geral</h1>
      </main>

    </HomeContainer>
    )
}

export default Home;