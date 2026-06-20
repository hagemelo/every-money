import styled from 'styled-components';

export const StyledAside = styled.aside`
  width: 240px;
  height: 100vh;
  background-color: rgb(41, 162, 184);
  color: white;
  display: flex;
  flex-direction: column;
  position: sticky;
  top: 0;
`;

export const SidebarHeader = styled.div`
  padding: 1.25rem 1.25rem 1rem;
  display: flex;
  align-items: center;
  gap: 0.625rem;

  h2 {
    font-size: 1.1rem;
    font-weight: 700;
    margin: 0;
  }
`;

export const BrandLogo = styled.img`
  width: 32px;
  height: 32px;
`;

export const SidebarNav = styled.nav`
  flex: 1;
  padding: 0.5rem 0;
  overflow-y: auto;

  ul {
    list-style: none;
    margin: 0;
    padding: 0;
  }
`;

export const NavGroupLabel = styled.li`
  padding: 1rem 1.25rem 0.375rem;
  font-size: 0.65rem;
  font-weight: 700;
  letter-spacing: 0.08em;
  text-transform: uppercase;
  color: rgba(255, 255, 255, 0.55);
  pointer-events: none;
`;

export const NavItem = styled.li`
  position: relative;
  color: rgba(255, 255, 255, 0.75);

  a {
    padding: 0.625rem 1.25rem 0.625rem 1.5rem;
    display: flex;
    align-items: center;
    gap: 0.75rem;
    color: inherit;
    text-decoration: none;
    font-size: 0.9rem;
    font-weight: 500;
    transition: background 0.15s, color 0.15s;
  }

  svg {
    width: 18px;
    height: 18px;
    flex-shrink: 0;
  }

  &::before {
    content: '';
    position: absolute;
    left: 0;
    top: 0.375rem;
    bottom: 0.375rem;
    width: 3px;
    border-radius: 0 2px 2px 0;
    background: white;
    opacity: 0;
    transition: opacity 0.15s;
  }

  &.active {
    color: white;
    background: rgba(255, 255, 255, 0.1);

    &::before {
      opacity: 1;
    }
  }

  &:hover:not(.active) {
    background: rgba(255, 255, 255, 0.06);
    color: white;
  }
`;

export const SidebarFooter = styled.div`
  padding: 1rem 1.25rem;
  border-top: 1px solid rgba(255, 255, 255, 0.15);
  background-color: rgb(21, 107, 122);
  display: flex;
  align-items: center;
  gap: 0.75rem;
`;

export const UserAvatar = styled.div`
  width: 36px;
  height: 36px;
  border-radius: 50%;
  background: rgba(255, 255, 255, 0.2);
  display: flex;
  align-items: center;
  justify-content: center;
  font-size: 0.8rem;
  font-weight: 700;
  flex-shrink: 0;
  letter-spacing: 0.02em;
`;

export const UserInfo = styled.div`
  flex: 1;
  min-width: 0;

  span {
    display: block;
    font-size: 0.85rem;
    font-weight: 600;
    white-space: nowrap;
    overflow: hidden;
    text-overflow: ellipsis;
  }

  small {
    display: block;
    font-size: 0.75rem;
    opacity: 0.75;
    white-space: nowrap;
    overflow: hidden;
    text-overflow: ellipsis;
  }
`;

export const LogoutButton = styled.button`
  background: rgba(255, 255, 255, 0.15);
  border: 1px solid rgba(255, 255, 255, 0.25);
  color: white;
  padding: 0.35rem 0.65rem;
  border-radius: 6px;
  cursor: pointer;
  font-size: 0.75rem;
  font-weight: 500;
  flex-shrink: 0;

  &:hover {
    background: rgba(255, 255, 255, 0.25);
  }
`;
