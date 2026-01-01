import styled from "styled-components";

export const Card = styled.div`
  width: 280px;
  padding: 20px;
  border-radius: 12px;
  color: #fff;

  background: ${props => props.background ||'linear-gradient(135deg, #4ade80, #22c55e)'};
  box-shadow: 0 8px 20px rgba(0, 0, 0, 0.12);
`;

export const Header = styled.div`
  display: flex;
  align-items: center;
  gap: 8px;
  opacity: 0.9;
`;

export const Title = styled.span`
  font-size: 14px;
  font-weight: 500;
`;


