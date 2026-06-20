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
  cursor: pointer;
  color: #ccc;

  a {
    padding: 0.75rem 1.5rem;
    display: flex;
    align-items: center;
    gap: 10px;
    color: inherit;
    text-decoration: none;
    width: 100%;
  }

  &.active,
  &:hover {
    background-color: rgb(21, 107, 122);
    color: white;
  }

  svg {
    width: 20px;
    height: 20px;
  }
`;

export const SidebarFooter = styled.div`
  padding: 1.5rem;
  border-top: 1px solid rgba(255,255,255,0.2);
  display: flex;
  flex-direction: column;
  gap: 8px;
  background-color: rgb(21, 107, 122);

  span {
    display: block;
    font-size: 0.85rem;
  }
`;

export const LogoutButton = styled.button`
  background: rgba(255,255,255,0.15);
  border: 1px solid rgba(255,255,255,0.3);
  color: white;
  padding: 0.4rem 0.75rem;
  border-radius: 6px;
  cursor: pointer;
  font-size: 0.8rem;
  margin-top: 0.5rem;
  align-self: flex-start;

  &:hover {
    background: rgba(255,255,255,0.25);
  }
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
    LogoutButton,
}

export default PainelFinanceiroSidebarStyles;