import styled, { keyframes } from 'styled-components';

const shimmer = keyframes`
  0% { background-position: -200px 0; }
  100% { background-position: 200px 0; }
`;

export const SkeletonBlock = styled.div`
  background: linear-gradient(90deg, #e5e7eb 25%, #f3f4f6 50%, #e5e7eb 75%);
  background-size: 400px 100%;
  animation: ${shimmer} 1.4s ease infinite;
  border-radius: ${props => props.$radius || '8px'};
  height: ${props => props.$height || '1rem'};
  width: ${props => props.$width || '100%'};
`;

export const PageToolbar = styled.div`
  margin-bottom: 1.5rem;
`;

export const ToolbarGreeting = styled.div`
  margin-bottom: 1.25rem;
`;

export const GreetingTitle = styled.h1`
  font-size: 1.5rem;
  font-weight: 700;
  color: #1f2937;
  margin: 0 0 0.25rem;
`;

export const GreetingSubtitle = styled.p`
  font-size: 0.9rem;
  color: #6b7280;
  margin: 0;
`;

export const ToolbarRow = styled.div`
  display: flex;
  align-items: flex-end;
  justify-content: space-between;
  flex-wrap: wrap;
  gap: 1rem;
`;

export const ToolbarFilters = styled.div`
  display: flex;
  align-items: flex-end;
  gap: 1.25rem;
  flex-wrap: wrap;
`;

export const ToolbarActions = styled.div`
  display: flex;
  gap: 0.75rem;
  flex-wrap: wrap;
`;

export const HomeDashboard = styled.div`
  display: grid;
  grid-template-columns: 1fr;
  gap: 1.5rem;

  @media (min-width: 1024px) {
    grid-template-columns: 2fr 1fr;
  }
`;

export const SectionCard = styled.section`
  background: white;
  border-radius: 16px;
  padding: 1.5rem;
  box-shadow: 0 1px 3px rgba(0, 0, 0, 0.06);
`;

export const SectionHeader = styled.div`
  display: flex;
  justify-content: space-between;
  align-items: center;
  margin-bottom: 1rem;
`;

export const SectionTitle = styled.h3`
  font-size: 1rem;
  font-weight: 600;
  color: #374151;
  margin: 0;
`;

export const DisplayGrid = styled.div`
  display: grid;
  grid-template-columns: repeat(auto-fill, minmax(240px, 1fr));
  gap: 1rem;
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
  display: flex;
  flex-direction: column;
  gap: 0.25rem;
`;

export const RecentItem = styled.div`
  display: flex;
  align-items: center;
  gap: 0.75rem;
  padding: 0.75rem;
  border-radius: 8px;
  transition: background 0.15s;

  &:hover {
    background: #f9fafb;
  }
`;

export const TransactionIcon = styled.div`
  width: 36px;
  height: 36px;
  border-radius: 50%;
  display: flex;
  align-items: center;
  justify-content: center;
  flex-shrink: 0;
  background: ${props => props.$tipo === 'Entrada' ? '#d1fae5' : '#fee2e2'};
  color: ${props => props.$tipo === 'Entrada' ? '#059669' : '#dc2626'};
`;

export const RecentContent = styled.div`
  flex: 1;
  min-width: 0;
`;

export const RecentDesc = styled.span`
  color: #374151;
  font-size: 0.875rem;
  font-weight: 500;
  display: block;
  white-space: nowrap;
  overflow: hidden;
  text-overflow: ellipsis;
`;

export const RecentMeta = styled.span`
  color: #9ca3af;
  font-size: 0.75rem;
  display: block;
`;

export const RecentValue = styled.span`
  font-weight: 600;
  color: ${props => props.$tipo === 'Entrada' ? '#10b981' : '#ef4444'};
  font-size: 0.875rem;
  flex-shrink: 0;
`;

export const ViewAllLink = styled.a`
  color: rgb(41, 162, 184);
  font-weight: 600;
  font-size: 0.85rem;
  text-decoration: none;
  cursor: pointer;

  &:hover {
    text-decoration: underline;
  }
`;

export const SkeletonKpiGrid = styled.div`
  display: grid;
  grid-template-columns: repeat(2, 1fr);
  gap: 1rem;
  margin-bottom: 1.5rem;

  @media (min-width: 900px) {
    grid-template-columns: repeat(4, 1fr);
  }
`;

export const SkeletonCard = styled.div`
  background: white;
  border-radius: 16px;
  padding: 1.5rem;
  box-shadow: 0 1px 3px rgba(0, 0, 0, 0.06);
`;
