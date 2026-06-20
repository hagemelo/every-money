import styled from 'styled-components';

export const CardContainer = styled.div`
  background-color: white;
  padding: 10px;
  border-radius: 12px;
  box-shadow: 0 4px 6px -1px rgba(0, 0, 0, 0.1);
  border-left: 5px solid ${props => props.borderColor || '#6366f1'};
  transition: transform 0.2s ease, box-shadow 0.2s ease;
  display: flex;
  flex-direction: column;

  &:hover {
    transform: translateY(-4px);
    box-shadow: 0 10px 15px -3px rgba(0, 0, 0, 0.1);
  }
`;

export const CategoryBadge = styled.span`
  font-size: 0.75rem;
  font-weight: 700;
  text-transform: uppercase;
  letter-spacing: 0.05em;
  color: rgb(21, 107, 122);
  background-color: rgb(225, 245, 248);
  padding: 4px 8px;
  border-radius: 4px;
  align-self: flex-start;
  margin-bottom: 4px;
`;

export const Title = styled.h3`
  font-size: 1.00rem;
  font-weight: bold;
  color: #1f2937;
  margin-bottom: 2px;
`;

export const Content = styled.p`
  color: #4b5563;
  line-height: 1.6;
  font-size: 1rem;
  margin-bottom: 8px;
`;

export const ActionLink = styled.button`
  background: none;
  border: none;
  color: #6366f1;
  font-weight: 600;
  font-size: 0.9rem;
  display: flex;
  align-items: center;
  margin-top: auto;
  cursor: pointer;
  padding: 0;

  &:hover {
    color: #4338ca;
    text-decoration: underline;
  }
`;

export const ProgressBarContainer = styled.div`
  width: 100%;
  height: 8px;
  background: #e5e7eb;
  border-radius: 4px;
  overflow: hidden;
  margin: 8px 0 4px;
`;

export const ProgressBarFill = styled.div`
  height: 100%;
  border-radius: 4px;
  background: ${props => props.$color || '#10b981'};
  width: ${props => Math.min(props.$percent, 100)}%;
  transition: width 0.3s ease;
`;

export const ProgressText = styled.span`
  font-size: 0.8rem;
  color: #6b7280;
`;