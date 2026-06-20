import PainelFinanceiroSidebarStyles from './painel-financeiro.sidebar.styles';
import logoIcon from '../../assets/logo192.png';
import homeIcon from '../../assets/home128.png';
import transactionsIcon from '../../assets/transaction128.png';
import categoriesIcon from '../../assets/categories128.png';
import accountIcon from '../../assets/account128.png';
import budgetsIcon from '../../assets/budget-planning.png';
import userIcon from '../../assets/user128.png';
import { Link, useLocation, useNavigate } from 'react-router-dom';
import { useLoginService } from '../../share/context/context.tsx';

const NAV_ITEMS = [
    { path: '/home', label: 'Visão Geral', icon: homeIcon },
    { path: '/account', label: 'Contas', icon: accountIcon },
    { path: '/budget', label: 'Orçamentos', icon: budgetsIcon },
    { path: '/transaction', label: 'Transações', icon: transactionsIcon },
    { path: '/category', label: 'Categorias', icon: categoriesIcon },
];

const PainelFinanceiroSidebar = ({ usuario }) => {
    const { StyledAside, SidebarHeader, Icon, SidebarNav, NavItem, SidebarFooter, LogoutButton } = PainelFinanceiroSidebarStyles;
    const location = useLocation();
    const navigate = useNavigate();
    const loginService = useLoginService();

    const handleLogout = () => {
        loginService.logout();
        navigate('/');
    };

    return (
        <StyledAside>
            <SidebarHeader>
                <Icon src={logoIcon} alt="Every Money" />
                <h2>Every Money</h2>
            </SidebarHeader>
            <SidebarNav>
                <ul>
                    {NAV_ITEMS.map(item => (
                        <NavItem key={item.path} className={location.pathname === item.path ? 'active' : ''}>
                            <Link to={item.path}>
                                <Icon src={item.icon} alt={item.label} />
                                {item.label}
                            </Link>
                        </NavItem>
                    ))}
                </ul>
            </SidebarNav>
            <SidebarFooter>
                <Icon src={userIcon} alt="Usuário" />
                <div>
                    <span>{usuario.name}</span>
                    <span>{usuario.email}</span>
                </div>
                <LogoutButton onClick={handleLogout} title="Sair">Sair</LogoutButton>
            </SidebarFooter>
        </StyledAside>
    );
};

export default PainelFinanceiroSidebar;
