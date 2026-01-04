import PainelFinanceiroSidebarStyles from './painel-financeiro.sidebar.styles';
import logoIcon from '../../assets/logo192.png';
import homeIcon from '../../assets/home128.png';
import transactionsIcon from '../../assets/transaction128.png';
import categoriesIcon from '../../assets/categories128.png';
import accountIcon from '../../assets/account128.png';
import budgetsIcon from '../../assets/budget-planning.png';
import userIcon from '../../assets/user128.png';
import { Link } from 'react-router-dom';

const PainelFinanceiroSidebar = ({usuario}) => {

    const { StyledAside, SidebarHeader, Icon, SidebarNav, NavItem, SidebarFooter } = PainelFinanceiroSidebarStyles
  
    return (
        <StyledAside>
            <SidebarHeader>
                <Icon src={logoIcon} alt="Every Money" />
                <h2>Every Money</h2>
            </SidebarHeader>
            <SidebarNav>
                <ul>
                    <NavItem className="active">
                        <Link to="/home">
                            <Icon src={homeIcon} alt="Visão Geral" />
                            Visão Geral
                        </Link>
                       
                    </NavItem>
                    <NavItem>
                        <Link to="/account">
                            <Icon src={accountIcon} alt="Contas" />
                            Contas
                        </Link>
                    </NavItem>

                    <NavItem>
                        <Link to="/budget">
                            <Icon src={budgetsIcon} alt="Orçamentos" />
                            Orçamentos
                        </Link>
                    </NavItem>
                
                    <NavItem>
                        <Link to="/transaction">
                            <Icon src={transactionsIcon} alt="Transações" />
                            Transações
                        </Link>
                    </NavItem>
                    <NavItem>
                        <Link to="/category">
                            <Icon src={categoriesIcon} alt="Categorias" />
                            Categorias
                        </Link>
                    </NavItem>
                   
                </ul>
            </SidebarNav>
            <SidebarFooter>
                <Icon src={userIcon} alt="Usuário" />
                <span>{usuario.name}</span>
                <span>{usuario.email}</span>
            </SidebarFooter>
        </StyledAside>
      )
  }
  
  export default PainelFinanceiroSidebar;