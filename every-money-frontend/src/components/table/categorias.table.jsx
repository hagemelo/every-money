import { Controls, Input, TableWrapper, Table, Th, Tr, Td,Pagination, Button } from "./table.styles.jsx";
import { TableContainer } from "../styles/main.styles.jsx";
import { useState, useMemo } from "react";


const CategoriasTable = ({ categorias = [], onCategoriaSelect }) => {
    const categoriasArray = Array.isArray(categorias) ? categorias : [];
    const [filter, setFilter] = useState('');
    const [sortConfig, setSortConfig] = useState({ key: 'id', direction: 'asc' });
    const [currentPage, setCurrentPage] = useState(1);
    const itemsPerPage = 10;

    const filteredData = useMemo(() => 
    categoriasArray.filter(item => 
      Object.values(item).some(val => String(val).toLowerCase().includes(filter.toLowerCase()))
    ), [filter, categoriasArray]);

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

    const handleCategoriaSelect = (e) => {
        const novaCategoria = e.target.value;
        if (onCategoriaSelect) {
        onCategoriaSelect(novaCategoria);
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
                            <Th onClick={() => requestSort('tipo')}>Tipo {sortConfig.key === 'tipo' && (sortConfig.direction === 'asc' ? '↑' : '↓')}</Th>
                            <Th onClick={() => requestSort('nome')}>Categoria {sortConfig.key === 'nome' && (sortConfig.direction === 'asc' ? '↑' : '↓')}</Th>
                            <Th onClick={() => requestSort('classificacao')}>Classificação {sortConfig.key === 'classificacao' && (sortConfig.direction === 'asc' ? '↑' : '↓')}</Th>
                        </tr>
                    </thead>
                    <tbody> 

                        {paginatedData && paginatedData.map(categoria => (
                            <Tr key={categoria.id}>
                                <Td>{categoria.tipo}</Td>
                                <Td>{categoria.nome}</Td>
                                <Td>{categoria.classificacao}</Td>
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

export default CategoriasTable;