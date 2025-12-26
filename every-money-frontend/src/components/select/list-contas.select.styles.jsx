import styled from "styled-components";

export const SelectWrapper = styled.div`
  display: flex;
  flex-direction: column;
  gap: 6px;
`;

export const Label = styled.label`
  font-size: 14px;
  color: #555;
`;

export const Select = styled.select`
  padding: 10px 12px;
  border-radius: 8px;
  border: 1px solid #ddd;
  background-color: #fff;
  font-size: 14px;
  color: #333;
  cursor: pointer;

  &:focus {
    outline: none;
    border-color: #4f46e5;
    box-shadow: 0 0 0 2px rgba(79, 70, 229, 0.2);
  }
`;