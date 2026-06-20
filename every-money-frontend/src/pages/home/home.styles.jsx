import styled from 'styled-components';

export const DisplayGrid = styled.div`
  display: grid;
  grid-template-columns: repeat(auto-fill, minmax(280px, 1fr));
  gap: 1.5rem;
  margin-top: 1rem;
`;

export const HomeHeader = styled.div`
  display: flex;
  justify-content: space-between;
  align-items: flex-start;
  flex-wrap: wrap;
  gap: 1rem;
  margin-bottom: 1.5rem;
`;

export const HomeControls = styled.div`
  display: flex;
  align-items: flex-end;
  gap: 1.5rem;
  flex-wrap: wrap;
`;

export const HomeLayout = styled.div`
  display: flex;
  gap: 20px;
  margin-bottom: 20px;

  @media (max-width: 900px) {
    flex-direction: column;
  }
`;

export const HomeMainColumn = styled.div`
  flex: 2;
`;

export const HomeSideColumn = styled.div`
  flex: 1;
`;

export const SectionHeader = styled.div`
  display: flex;
  justify-content: space-between;
  align-items: center;
  margin-bottom: 0.5rem;
`;

export const LoadingMessage = styled.p`
  color: #6b7280;
  font-style: italic;
`;

export const ErrorMessage = styled.p`
  color: #ef4444;
  background: #fef2f2;
  padding: 0.75rem 1rem;
  border-radius: 8px;
  margin-bottom: 1rem;
`;

export const RecentList = styled.div`
  background: white;
  border-radius: 12px;
  box-shadow: 0 4px 6px -1px rgba(0, 0, 0, 0.08);
  overflow: hidden;
`;

export const RecentItem = styled.div`
  display: flex;
  justify-content: space-between;
  align-items: center;
  padding: 0.875rem 1.25rem;
  border-bottom: 1px solid #f3f4f6;

  &:last-child {
    border-bottom: none;
  }
`;

export const RecentDesc = styled.span`
  color: #374151;
  font-size: 0.9rem;
`;

export const RecentMeta = styled.span`
  color: #9ca3af;
  font-size: 0.8rem;
  display: block;
`;

export const RecentValue = styled.span`
  font-weight: 600;
  color: ${props => props.$tipo === 'Entrada' ? '#10b981' : '#ef4444'};
  font-size: 0.9rem;
`;

export const ViewAllLink = styled.a`
  color: rgb(41, 162, 184);
  font-weight: 600;
  font-size: 0.9rem;
  text-decoration: none;
  cursor: pointer;

  &:hover {
    text-decoration: underline;
  }
`;
