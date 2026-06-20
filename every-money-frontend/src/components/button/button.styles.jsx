import styled from 'styled-components';

export const StyledButton = styled.button`
  padding: 0.625rem 1.25rem;
  border-radius: 8px;
  font-size: 0.9rem;
  font-weight: 600;
  cursor: ${props => props.disabled ? 'not-allowed' : 'pointer'};
  opacity: ${props => props.disabled ? 0.6 : 1};
  transition: background 0.2s, transform 0.1s;
  border: none;

  ${props => props.$variant === 'secondary' ? `
    background: white;
    color: rgb(41, 162, 184);
    border: 2px solid rgb(41, 162, 184);
    &:hover:not(:disabled) { background: rgb(225, 245, 248); }
  ` : `
    background: rgb(41, 162, 184);
    color: white;
    &:hover:not(:disabled) { background: rgb(21, 107, 122); }
  `}

  &:active:not(:disabled) {
    transform: scale(0.98);
  }
`;

export const ButtonGroup = styled.div`
  display: flex;
  gap: 0.75rem;
  flex-wrap: wrap;
`;
