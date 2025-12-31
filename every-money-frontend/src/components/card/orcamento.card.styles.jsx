import styled from 'styled-components';

export const CardContainer = styled.div`
  background-color: white;
  padding: 24px;
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
  color: #4f46e5;
  background-color: #eef2ff;
  padding: 4px 8px;
  border-radius: 4px;
  align-self: flex-start;
  margin-bottom: 12px;
`;

export const Title = styled.h3`
  font-size: 1.25rem;
  font-weight: bold;
  color: #1f2937;
  margin-bottom: 8px;
`;

export const Content = styled.p`
  color: #4b5563;
  line-height: 1.6;
  font-size: 1rem;
  margin-bottom: 20px;
`;

export const ActionLink = styled.a`
  color: #6366f1;
  text-decoration: none;
  font-weight: 600;
  font-size: 0.9rem;
  display: flex;
  align-items: center;
  margin-top: auto;

  &:hover {
    color: #4338ca;
    text-decoration: underline;
  }
`;