import { Controls, Input, TableWrapper, Table, Th, Tr, Td,Pagination, Button } from "./contas.table.styles.jsx";
import { TableContainer } from "../styles/main.styles.jsx";
import { useState, useMemo } from "react";


const ContasTable = ({ contas = [], onContaSelect }) => {
    const contasArray = Array.isArray(contas) ? contas : [];
    const [filter, setFilter] = useState('');
    const [sortConfig, setSortConfig] = useState({ key: 'id', direction: 'asc' });
    const [currentPage, setCurrentPage] = useState(1);
    const itemsPerPage = 10;

    const filteredData = useMemo(() => 
    contasArray.filter(item => 
      Object.values(item).some(val => String(val).toLowerCase().includes(filter.toLowerCase()))
    ), [filter, contasArray]);

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

    const handleContaSelect = (e) => {
        const novaConta = e.target.value;
        if (onContaSelect) {
        onContaSelect(novaConta);
        }
    };
    return (
        <TableContainer>
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
                            <Th onClick={() => requestSort('nome')}>Conta {sortConfig.key === 'nome' && (sortConfig.direction === 'asc' ? '↑' : '↓')}</Th>
                            <Th onClick={() => requestSort('tipoConta')}>Tipo {sortConfig.key === 'tipoConta' && (sortConfig.direction === 'asc' ? '↑' : '↓')}</Th>
                            <Th onClick={() => requestSort('saldoPrevisto')}>Saldo Previsto {sortConfig.key === 'saldoPrevisto' && (sortConfig.direction === 'asc' ? '↑' : '↓')}</Th>
                            <Th onClick={() => requestSort('saldoRealizado')}>Saldo Realizado {sortConfig.key === 'saldoRealizado' && (sortConfig.direction === 'asc' ? '↑' : '↓')}</Th>
                        </tr>
                    </thead>
                    <tbody> 

                        {paginatedData && paginatedData.map(conta => (
                            <Tr key={conta.id}>
                                <Td>{conta.nome}</Td>
                                <Td>{conta.tipoConta}</Td>
                                <Td>{conta.saldoPrevisto}</Td>
                                <Td>{conta.saldoRealizado}</Td>
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

export default ContasTable;