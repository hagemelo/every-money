import styled from 'styled-components';

export const ShellContainer = styled.div`
  min-height: 100vh;
  display: flex;
  background: linear-gradient(to bottom right, rgb(225, 245, 248), rgb(211, 234, 238));
  font-family: Inter, ui-sans-serif, system-ui, -apple-system, BlinkMacSystemFont,
    "Segoe UI", Roboto, "Helvetica Neue", Arial, "Noto Sans", sans-serif;
`;

export const ContentWrapper = styled.div`
  flex: 1;
  display: flex;
  flex-direction: column;
  min-width: 0;
`;

export const MainContent = styled.main`
  flex: 1;
  padding: 1.5rem;
  max-width: 1280px;
  width: 100%;
  margin: 0 auto;
  box-sizing: border-box;

  @media (min-width: 768px) {
    padding: 2rem;
  }

  h1 {
    color: #1f2937;
    margin: 0 0 0.25rem;
    font-size: 1.5rem;
    font-weight: 700;
  }

  h3 {
    color: #374151;
    margin: 0;
    font-size: 1rem;
    font-weight: 600;
  }
`;

export const MobileTopBar = styled.header`
  display: flex;
  align-items: center;
  justify-content: space-between;
  padding: 0.875rem 1rem;
  background: rgb(41, 162, 184);
  color: white;
  position: sticky;
  top: 0;
  z-index: 100;

  @media (min-width: 768px) {
    display: none;
  }
`;

export const MenuButton = styled.button`
  background: none;
  border: none;
  color: white;
  padding: 0.25rem;
  cursor: pointer;
  display: flex;
  align-items: center;
  justify-content: center;
  border-radius: 6px;

  &:hover {
    background: rgba(255, 255, 255, 0.15);
  }
`;

export const TopBarBrand = styled.div`
  display: flex;
  align-items: center;
  gap: 0.5rem;
  font-weight: 700;
  font-size: 1rem;

  img {
    width: 28px;
    height: 28px;
  }
`;

export const DrawerOverlay = styled.div`
  display: ${props => props.$open ? 'block' : 'none'};
  position: fixed;
  inset: 0;
  background: rgba(0, 0, 0, 0.4);
  z-index: 150;

  @media (min-width: 768px) {
    display: none;
  }
`;

export const MobileDrawer = styled.aside`
  position: fixed;
  top: 0;
  left: 0;
  bottom: 0;
  width: 260px;
  z-index: 200;
  transform: translateX(${props => props.$open ? '0' : '-100%'});
  transition: transform 0.25s ease;
  pointer-events: ${props => props.$open ? 'auto' : 'none'};

  @media (min-width: 768px) {
    display: none;
  }
`;

export const DesktopSidebarWrapper = styled.div`
  display: none;
  flex-shrink: 0;

  @media (min-width: 768px) {
    display: block;
  }
`;
