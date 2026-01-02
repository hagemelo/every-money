import { MainContainer, MainContent } from '../../components/styles/main.styles.jsx';
import PainelFinanceiroSidebar from '../../components/sidebar/painel-financeiro.sidebar.jsx';
import { useAccount } from '../../hook/useAccount.tsx';
import ContasTable from '../../components/table/contas.table.jsx';

const Account = () => {
    const {usuario, contas} = useAccount();

    const handleContaSelect = (novaConta) => {
        console.log('Conta selecionada:', novaConta);
    };

    return (
        <MainContainer>
            <PainelFinanceiroSidebar usuario={usuario} />
            <MainContent>
            <h1>Contas</h1>

            <ContasTable contas={contas} onContaSelect={handleContaSelect} />
            
            </MainContent>
        </MainContainer>
    )

}

export default Account;