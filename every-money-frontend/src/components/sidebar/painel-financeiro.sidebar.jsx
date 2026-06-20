import {
  FiHome,
  FiCreditCard,
  FiPieChart,
  FiRepeat,
  FiTag,
} from 'react-icons/fi';
import {
  StyledAside,
  SidebarHeader,
  BrandLogo,
  SidebarNav,
  NavGroupLabel,
  NavItem,
  SidebarFooter,
  UserAvatar,
  UserInfo,
  LogoutButton,
} from './painel-financeiro.sidebar.styles';
import logoIcon from '../../assets/logo192.png';
import { Link, useLocation, useNavigate } from 'react-router-dom';
import { useLoginService } from '../../share/context/context.tsx';

const NAV_GROUPS = [
  {
    label: 'Principal',
    items: [
      { path: '/home', label: 'Visão Geral', icon: FiHome },
    ],
  },
  {
    label: 'Gestão',
    items: [
      { path: '/account', label: 'Contas', icon: FiCreditCard },
      { path: '/budget', label: 'Orçamentos', icon: FiPieChart },
      { path: '/transaction', label: 'Transações', icon: FiRepeat },
      { path: '/category', label: 'Categorias', icon: FiTag },
    ],
  },
];

function getInitials(name) {
  if (!name) return '?';
  return name
    .split(' ')
    .filter(Boolean)
    .map(part => part[0])
    .slice(0, 2)
    .join('')
    .toUpperCase();
}

const PainelFinanceiroSidebar = ({ usuario, onNavigate }) => {
  const location = useLocation();
  const navigate = useNavigate();
  const loginService = useLoginService();

  const handleLogout = () => {
    loginService.logout();
    navigate('/');
  };

  const handleNavClick = () => {
    onNavigate?.();
  };

  return (
    <StyledAside>
      <SidebarHeader>
        <BrandLogo src={logoIcon} alt="Every Money" />
        <h2>Every Money</h2>
      </SidebarHeader>

      <SidebarNav>
        <ul>
          {NAV_GROUPS.map(group => (
            <li key={group.label}>
              <ul style={{ listStyle: 'none', margin: 0, padding: 0 }}>
                <NavGroupLabel>{group.label}</NavGroupLabel>
                {group.items.map(item => {
                  const Icon = item.icon;
                  return (
                    <NavItem
                      key={item.path}
                      className={location.pathname === item.path ? 'active' : ''}
                    >
                      <Link to={item.path} onClick={handleNavClick}>
                        <Icon />
                        {item.label}
                      </Link>
                    </NavItem>
                  );
                })}
              </ul>
            </li>
          ))}
        </ul>
      </SidebarNav>

      <SidebarFooter>
        <UserAvatar>{getInitials(usuario?.name)}</UserAvatar>
        <UserInfo>
          <span>{usuario?.name}</span>
          <small>{usuario?.email}</small>
        </UserInfo>
        <LogoutButton onClick={handleLogout} title="Sair">
          Sair
        </LogoutButton>
      </SidebarFooter>
    </StyledAside>
  );
};

export default PainelFinanceiroSidebar;
