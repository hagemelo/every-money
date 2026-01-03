import { MainContainer, MainContent } from '../../components/styles/main.styles.jsx';
import PainelFinanceiroSidebar from '../../components/sidebar/painel-financeiro.sidebar.jsx';
import { useCategory } from '../../hook/useCategory.tsx';
import CategoriasTable from '../../components/table/categorias.table.jsx';

const Category = () => {
    const {usuario, categorias} = useCategory();

    const handleCategoriaSelect = (novaCategoria) => {
        console.log('Categoria selecionada:', novaCategoria);
    };

    return (
        <MainContainer>
            <PainelFinanceiroSidebar usuario={usuario} />
            <MainContent>
            <h1>Categorias</h1>

            <CategoriasTable categorias={categorias} onCategoriaSelect={handleCategoriaSelect} />
            
            </MainContent>
        </MainContainer>
    )

}

export default Category;