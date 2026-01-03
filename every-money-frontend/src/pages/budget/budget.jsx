import { MainContainer, MainContent } from '../../components/styles/main.styles.jsx';
import PainelFinanceiroSidebar from '../../components/sidebar/painel-financeiro.sidebar.jsx';
import { useBudget } from '../../hook/useBudget.tsx';
import OrcamentoTable from '../../components/table/orcamento.table.jsx';

const Budget = () => {
    const {usuario, orcamentos} = useBudget();

    const handleOrcamentoSelect = (novaCategoria) => {
        console.log('Orçamento selecionado:', novaCategoria);
    };

    return (
        <MainContainer>
            <PainelFinanceiroSidebar usuario={usuario} />
            <MainContent>
            <h1>Orçamentos</h1>
            <OrcamentoTable orcamentos={orcamentos} onOrcamentoSelect={handleOrcamentoSelect} />
            </MainContent>
        </MainContainer>
    )

}

export default Budget;