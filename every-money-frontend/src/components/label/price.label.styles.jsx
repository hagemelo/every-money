import styled from 'styled-components';

export const ValueContainer = styled.div`
  display: flex;
  align-items: baseline;
  font-family: 'Inter', sans-serif;
  color: #1a1a1b;
`;

export const CurrencySymbol = styled.span`
  font-size: 1rem;
  font-weight: 500;
  color: #6b7280; /* Cinza mais claro para o cifrão */
  margin-right: 4px;
`;

export const Amount = styled.span`
  font-size: 1.5rem;
  font-weight: 700;
  letter-spacing: -1px;
`;

export const Decimal = styled.span`
  font-size: 1.2rem;
  font-weight: 600;
`;