import styled from 'styled-components';


export const Controls = styled.div`
  display: flex;
  justify-content: space-between;
  align-items: center;
  margin-bottom: 20px;
`;

export const Input = styled.input`
  padding: 10px 15px;
  border: 1px solid #ccc;
  border-radius: 8px;
  width: 300px;
  outline: none;
  &:focus { border-color: #007bff; box-shadow: 0 0 5px rgba(0,123,255,0.2); }
`;

export const TableWrapper = styled.div`
  overflow-x: auto;
  border-radius: 12px;
  box-shadow: 0 4px 15px rgba(0,0,0,0.1);
`;

export const Table = styled.table`
  width: 100%;
  border-collapse: collapse;
  background: white;
`;

export const Th = styled.th`
  background-color: rgba(41, 162, 184,1);
  color: white;
  padding: 15px;
  text-align: left;
  cursor: pointer;
  user-select: none;
  transition: background 0.2s;
  &:hover { background-color: rgba(21, 107, 122,1); }
`;

export const Td = styled.td`
  padding: 12px 15px;
  border-bottom: 1px solid #eee;
  color: #333;
`;

export const Tr = styled.tr`
  &:nth-child(even) { background-color: #f8f9fa; }
  &:hover { background-color: #f1f4f9; }
`;

export const Pagination = styled.div`
  margin-top: 20px;
  display: flex;
  justify-content: center;
  gap: 10px;
  align-items: center;
`;

export const Button = styled.button`
  padding: 8px 16px;
  border: none;
  border-radius: 4px;
  background-color: ${props => props.disabled ? '#ccc' : '#007bff'};
  color: white;
  cursor: ${props => props.disabled ? 'not-allowed' : 'pointer'};
  &:hover { background-color: ${props => props.disabled ? '#ccc' : '#0056b3'}; }
`;