import { MainContainer, MainContent } from '../../components/styles/main.styles.jsx';
import PainelFinanceiroSidebar from '../../components/sidebar/painel-financeiro.sidebar.jsx';
import { useTransaction } from '../../hook/useTransaction.tsx';
import ListContas from '../../components/select/list-contas.select.jsx';
import TransacaoTable from '../../components/table/transacoes.table.jsx';
import { useState, useEffect } from 'react';

const Transaction = () => {
    const {usuario, contas, loading, loadTransacoes} = useTransaction();

    const [contaSelecionada, setContaSelecionada] = useState(null);
    const [transacoes, setTransacoes] = useState([]);

        const handleContaSelect = (novaConta) => {
            setContaSelecionada(novaConta);
    };

    const handleTransacaoSelect = (novaTransacao) => {
        console.log('Transação selecionada:', novaTransacao);
    };

    async function getTransacoes() {
        if (contaSelecionada) {
            const conta = contas.find((conta) => conta.nome === contaSelecionada);
            const transacoes = await loadTransacoes(conta.id);
            setTransacoes(transacoes);
        }
    }

    useEffect(() => {
      getTransacoes();
    }, [contaSelecionada]);

    return (
        <MainContainer>
            <PainelFinanceiroSidebar usuario={usuario} />
            <MainContent>
            <h1>Transações</h1>

            <ListContas contas={contas ?? []} onContaChange={handleContaSelect} />
            {transacoes && transacoes.length > 0 ? (
              <TransacaoTable transacoes={transacoes} onTransacaoSelect={handleTransacaoSelect}/>
            ) : (
              <p>Nenhuma transação encontrada</p>
            )}
            
            </MainContent>
        </MainContainer>
    )

}

export default Transaction;