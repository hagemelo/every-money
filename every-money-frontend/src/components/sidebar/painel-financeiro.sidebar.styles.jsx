import styled from 'styled-components';

export const StyledAside = styled.aside`
  width: 260px;
  height: 100vh;
  background-color:rgb(41, 162, 184);
  color: white;
  display: flex;
  flex-direction: column;
  justify-content: space-between;
`;

export const SidebarHeader = styled.div`
  padding: 1.5rem;
  display: flex;
  align-items: center;
  gap: 10px;

  h2 {
    font-size: 1.2rem;
    margin: 0;
  }
`;

export const Icon = styled.img`
  width: 20px;
  height: 20px;
`;



export const SidebarNav = styled.nav`
  flex: 1;
  padding: 1rem 0;

  ul {
    list-style: none;
    margin: 0;
    padding: 0;
  }
`;

export const NavItem = styled.li`
  padding: 0.75rem 1.5rem;
  display: flex;
  align-items: center;
  gap: 10px;
  cursor: pointer;
  color: #ccc;

  &.active,
  &:hover {
    background-color:rgb(21, 107, 122);
    color: white;
  }

  svg {
    width: 20px;
    height: 20px;
  }
`;

export const SidebarFooter = styled.div`
  padding: 1.5rem;
  border-top: 1px solid #333;
  display: flex;
  align-items: center;
  gap: 10px;
  background-color:rgb(21, 107, 122));
`;

export const UserAvatar = styled.span`
  background-color: #5aff5a;
  border-radius: 50%;
  width: 10px;
  height: 10px;
  display: inline-block;
`;

const PainelFinanceiroSidebarStyles = {
    StyledAside,
    SidebarHeader,
    Icon,
    SidebarNav,
    NavItem,
    SidebarFooter,
    UserAvatar,
}

export default PainelFinanceiroSidebarStyles;