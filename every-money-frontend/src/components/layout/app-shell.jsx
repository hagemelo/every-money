import { useState } from 'react';
import { FiMenu } from 'react-icons/fi';
import PainelFinanceiroSidebar from '../sidebar/painel-financeiro.sidebar.jsx';
import logoIcon from '../../assets/logo192.png';
import {
  ShellContainer,
  ContentWrapper,
  MainContent,
  MobileTopBar,
  MenuButton,
  TopBarBrand,
  DrawerOverlay,
  MobileDrawer,
  DesktopSidebarWrapper,
} from './app-shell.styles.jsx';

function AppShell({ usuario, children }) {
  const [drawerOpen, setDrawerOpen] = useState(false);

  const closeDrawer = () => setDrawerOpen(false);

  return (
    <ShellContainer>
      <DesktopSidebarWrapper>
        <PainelFinanceiroSidebar usuario={usuario} />
      </DesktopSidebarWrapper>

      <DrawerOverlay $open={drawerOpen} onClick={closeDrawer} />
      <MobileDrawer $open={drawerOpen}>
        <PainelFinanceiroSidebar usuario={usuario} onNavigate={closeDrawer} />
      </MobileDrawer>

      <ContentWrapper>
        <MobileTopBar>
          <MenuButton onClick={() => setDrawerOpen(true)} aria-label="Abrir menu">
            <FiMenu size={22} />
          </MenuButton>
          <TopBarBrand>
            <img src={logoIcon} alt="" />
            Every Money
          </TopBarBrand>
          <div style={{ width: 30 }} />
        </MobileTopBar>

        <MainContent>{children}</MainContent>
      </ContentWrapper>
    </ShellContainer>
  );
}

export default AppShell;
