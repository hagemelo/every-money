import { Controls, Input, TableWrapper, Table, Th, Tr, Td,Pagination, Button } from "./table.styles.jsx";
import { TableContainer } from "../styles/main.styles.jsx";
import { useState, useMemo } from "react";
import PriceInTableLabel from "../label/price-in-table.label";
import DateLabel from "../label/date.label";
import StatusTransacaoLabel from "../label/status-transacao.label";


const TransacoesTable = ({ transacoes = [], onTransacaoSelect }) => {
    const transacoesArray = Array.isArray(transacoes) ? transacoes : [];
    const [filter, setFilter] = useState('');
    const [sortConfig, setSortConfig] = useState({ key: 'id', direction: 'asc' });
    const [currentPage, setCurrentPage] = useState(1);
    const itemsPerPage = 10;

    const filteredData = useMemo(() => 
    transacoesArray.filter(item => 
      Object.values(item).some(val => String(val).toLowerCase().includes(filter.toLowerCase()))
    ), [filter, transacoesArray]);

    const sortedData = useMemo(() => {
    let items = [...filteredData];
    items.sort((a, b) => {
      if (a[sortConfig.key] < b[sortConfig.key]) return sortConfig.direction === 'asc' ? -1 : 1;
      if (a[sortConfig.key] > b[sortConfig.key]) return sortConfig.direction === 'asc' ? 1 : -1;
      return 0;
    });
    return items;
    }, [filteredData, sortConfig]);

    const paginatedData = sortedData.slice((currentPage - 1) * itemsPerPage, currentPage * itemsPerPage);
    const totalPages = Math.ceil(sortedData.length / itemsPerPage);

    const requestSort = (key) => {
        setSortConfig(prev => ({
        key,
        direction: prev.key === key && prev.direction === 'asc' ? 'desc' : 'asc'
        }));
    };

    const handleTransacaoSelect = (e) => {
        const novaTransacao = e.target.value;
        if (onTransacaoSelect) {
        onTransacaoSelect(novaTransacao);
        }
    };
    return (
        <TableContainer maxWidth="100%">
            <Controls>
                <Input 
                    placeholder="Pesquisar em toda a tabela..." 
                    onChange={(e) => { setFilter(e.target.value); setCurrentPage(1); }}
                    />
            </Controls>
            <TableWrapper>
                <Table>
                    <thead>
                        <tr>
                            <Th onClick={() => requestSort('status')}>Status {sortConfig.key === 'status' && (sortConfig.direction === 'asc' ? '↑' : '↓')}</Th> 
                            <Th onClick={() => requestSort('data')}>Data {sortConfig.key === 'data' && (sortConfig.direction === 'asc' ? '↑' : '↓')}</Th>
                            <Th onClick={() => requestSort('descricao')}>Descrição {sortConfig.key === 'descricao' && (sortConfig.direction === 'asc' ? '↑' : '↓')}</Th>
                            <Th onClick={() => requestSort('valor')}>Valor {sortConfig.key === 'valor' && (sortConfig.direction === 'asc' ? '↑' : '↓')}</Th>
                            <Th onClick={() => requestSort('tipo')}>Tipo Transação {sortConfig.key === 'tipo' && (sortConfig.direction === 'asc' ? '↑' : '↓')}</Th>
                            <Th onClick={() => requestSort('categoria')}>Categoria {sortConfig.key === 'categoria' && (sortConfig.direction === 'asc' ? '↑' : '↓')}</Th>
                        </tr>
                    </thead>
                    <tbody> 

                        {paginatedData && paginatedData.map(transacao => (
                            <Tr key={transacao.id}>
                                <Td>
                                    <StatusTransacaoLabel status={transacao.status} />
                                </Td>
                                <Td>
                                    <DateLabel date={transacao.data} />
                                </Td>
                                <Td>{transacao.descricao}</Td>
                                <Td>
                                    <PriceInTableLabel valor={transacao.valor} />
                                </Td>
                                
                                <Td>{transacao.tipo}</Td>
                                <Td>{transacao.categoria.classificacao} / {transacao.categoria.nome}</Td>
                            </Tr>
                        ))}
                    </tbody>
                </Table>
            </TableWrapper>
            <Pagination>
                <Button onClick={() => setCurrentPage(p => p - 1)} disabled={currentPage === 1}>Anterior</Button>
                <span>Página <strong>{currentPage}</strong> de {totalPages || 1}</span>
                <Button onClick={() => setCurrentPage(p => p + 1)} disabled={currentPage >= totalPages}>Próximo</Button>
            </Pagination>
        </TableContainer>
        );
}

export default TransacoesTable;