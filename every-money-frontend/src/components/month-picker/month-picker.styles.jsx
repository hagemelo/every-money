import styled from 'styled-components';

export const MonthPickerContainer = styled.div`
  display: flex;
  align-items: center;
  gap: 0.75rem;
`;

export const MonthLabel = styled.span`
  font-weight: 600;
  color: #374151;
  min-width: 160px;
  text-align: center;
  text-transform: capitalize;
`;

export const MonthButton = styled.button`
  background: white;
  border: 1px solid rgb(41, 162, 184);
  color: rgb(41, 162, 184);
  border-radius: 8px;
  width: 36px;
  height: 36px;
  cursor: pointer;
  font-size: 1rem;
  display: flex;
  align-items: center;
  justify-content: center;

  &:hover {
    background: rgb(225, 245, 248);
  }
`;
