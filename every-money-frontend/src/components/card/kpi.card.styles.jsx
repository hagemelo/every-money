import styled from 'styled-components';

export const KpiGrid = styled.div`
  display: grid;
  grid-template-columns: repeat(2, 1fr);
  gap: 1rem;
  margin-bottom: 1.5rem;

  @media (min-width: 900px) {
    grid-template-columns: repeat(4, 1fr);
  }
`;

export const KpiCard = styled.div`
  background: ${props => props.$background || 'linear-gradient(135deg, rgb(41, 162, 184), rgb(21, 107, 122))'};
  border-radius: 12px;
  padding: 1.25rem;
  color: white;
  box-shadow: 0 4px 12px rgba(0, 0, 0, 0.1);
`;

export const KpiLabel = styled.span`
  display: block;
  font-size: 0.75rem;
  font-weight: 600;
  text-transform: uppercase;
  letter-spacing: 0.04em;
  opacity: 0.9;
  margin-bottom: 0.5rem;
`;

export const KpiValue = styled.span`
  display: block;
  font-size: 1.5rem;
  font-weight: 700;
  line-height: 1.2;

  @media (min-width: 900px) {
    font-size: 1.75rem;
  }
`;
