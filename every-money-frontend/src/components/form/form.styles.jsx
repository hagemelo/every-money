import styled from 'styled-components';

export const FormGroup = styled.div`
  display: flex;
  flex-direction: column;
  gap: 6px;
  margin-bottom: 1rem;
`;

export const FormLabel = styled.label`
  font-size: 14px;
  font-weight: 500;
  color: #374151;
`;

export const FormInput = styled.input`
  padding: 10px 12px;
  border-radius: 8px;
  border: 1px solid #ddd;
  font-size: 14px;
  color: #333;

  &:focus {
    outline: none;
    border-color: rgb(41, 162, 184);
    box-shadow: 0 0 0 2px rgba(41, 162, 184, 0.2);
  }
`;

export const FormSelect = styled.select`
  padding: 10px 12px;
  border-radius: 8px;
  border: 1px solid #ddd;
  font-size: 14px;
  color: #333;
  background: white;
  cursor: pointer;

  &:focus {
    outline: none;
    border-color: rgb(41, 162, 184);
    box-shadow: 0 0 0 2px rgba(41, 162, 184, 0.2);
  }
`;

export const FormError = styled.span`
  font-size: 12px;
  color: #ef4444;
`;

export const FormRow = styled.div`
  display: grid;
  grid-template-columns: 1fr 1fr;
  gap: 1rem;

  @media (max-width: 480px) {
    grid-template-columns: 1fr;
  }
`;
