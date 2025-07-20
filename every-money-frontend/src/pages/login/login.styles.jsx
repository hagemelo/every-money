import styled from 'styled-components';

const LoginContainer = styled.div`
min-height: 100vh;
display: flex;
align-items: center;
justify-content: center;
background: linear-gradient(to bottom right,rgb(41, 162, 184),rgb(21, 107, 122));
padding: 1rem;
font-family: Inter, ui-sans-serif, system-ui, -apple-system, BlinkMacSystemFont, "Segoe UI", Roboto, "Helvetica Neue", Arial, "Noto Sans", sans-serif, "Apple Color Emoji", "Segoe UI Emoji", "Segoe UI Symbol", "Noto Color Emoji";

`;

const StyledCard = styled.div`
  background-color: #ffffff; 
  padding: 2rem; 
  border-radius: 0.75rem; 
  box-shadow: 0 25px 50px -12px rgba(0, 0, 0, 0.25); 
  max-width: 28rem; 
  width: 100%; 
  border: 1px solid #e5e7eb; 
  transform: scale(1); 
  transition: transform 0.3s ease-in-out; 
  &:hover {
    transform: scale(1.05); 
  }
`;

const StyledHeading = styled.h1`
  font-size: 2.25rem; /* text-4xl */
  line-height: 2.5rem; 
  font-weight: 800; 
  text-align: center; 
  color: #1a202c; 
  margin-bottom: 2rem; 
`;

const StyledLabel = styled.label`
  display: block;
  font-size: 0.875rem;
  line-height: 1.25rem;
  font-weight: 500;
  color: #4a5568;
  margin-bottom: 0.5rem;
`;

const StyledInput = styled.input`
  display: block;
  font-size: 0.875rem;
  line-height: 1.25rem;
  font-weight: 500;
  color: #4a5568;
  margin-bottom: 0.5rem;
`;

const StyledButton = styled.button`
  display: block;
  font-size: 0.875rem;
  line-height: 1.25rem;
  font-weight: 500;
  color: #4a5568;
  margin-bottom: 0.5rem;
`;

const StyledMessage = styled.div`
  padding: 0.75rem; /* p-3 */
  margin-bottom: 1rem; /* mb-4 */
  border-radius: 0.5rem; /* rounded-lg */
  text-align: center; /* text-center */
  background-color: ${props => props.isSuccess ? '#d1fae5' : '#fee2e2'}; /* bg-green-100 or bg-red-100 */
  color: ${props => props.isSuccess ? '#047857' : '#b91c1c'}; /* text-green-700 or text-red-700 */
`;

const LoginStyles = {
    LoginContainer,
    StyledCard,
    StyledHeading,
    StyledLabel,
    StyledInput,
    StyledButton,
    StyledMessage,
}

export default LoginStyles;