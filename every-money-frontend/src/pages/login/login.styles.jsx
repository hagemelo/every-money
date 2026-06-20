import styled, { keyframes } from 'styled-components';

const shake = keyframes`
  0%, 100% { transform: translateX(0); }
  20%, 60% { transform: translateX(-6px); }
  40%, 80% { transform: translateX(6px); }
`;

const LoginPage = styled.div`
  min-height: 100vh;
  display: flex;
  font-family: Inter, ui-sans-serif, system-ui, -apple-system, BlinkMacSystemFont,
    "Segoe UI", Roboto, "Helvetica Neue", Arial, "Noto Sans", sans-serif;
`;

const BrandPanel = styled.div`
  flex: 1;
  display: none;
  flex-direction: column;
  justify-content: center;
  padding: 3rem;
  background: linear-gradient(135deg, rgb(41, 162, 184), rgb(21, 107, 122));
  color: white;

  @media (min-width: 900px) {
    display: flex;
  }
`;

const BrandLogo = styled.img`
  width: 56px;
  height: 56px;
  margin-bottom: 1.5rem;
`;

const BrandTitle = styled.h1`
  font-size: 2rem;
  font-weight: 800;
  margin: 0 0 0.75rem;
  line-height: 1.2;
`;

const BrandTagline = styled.p`
  font-size: 1.125rem;
  opacity: 0.9;
  margin: 0 0 2.5rem;
  line-height: 1.6;
  max-width: 360px;
`;

const FeatureList = styled.ul`
  list-style: none;
  margin: 0;
  padding: 0;
  display: flex;
  flex-direction: column;
  gap: 0.875rem;
`;

const FeatureItem = styled.li`
  display: flex;
  align-items: center;
  gap: 0.75rem;
  font-size: 0.95rem;
  opacity: 0.95;

  &::before {
    content: '';
    width: 8px;
    height: 8px;
    border-radius: 50%;
    background: rgba(255, 255, 255, 0.8);
    flex-shrink: 0;
  }
`;

const FormPanel = styled.div`
  flex: 1;
  display: flex;
  align-items: center;
  justify-content: center;
  padding: 1.5rem;
  background: linear-gradient(to bottom right, rgb(225, 245, 248), rgb(211, 234, 238));
`;

const FormCard = styled.div`
  background: #ffffff;
  border-radius: 16px;
  padding: 2.5rem;
  width: 100%;
  max-width: 420px;
  box-shadow: 0 4px 24px rgba(0, 0, 0, 0.08);
  animation: ${props => props.$shake ? shake : 'none'} 0.4s ease;

  @media (max-width: 480px) {
    padding: 2rem 1.5rem;
  }
`;

const MobileBrand = styled.div`
  display: flex;
  align-items: center;
  gap: 0.75rem;
  margin-bottom: 2rem;

  @media (min-width: 900px) {
    display: none;
  }

  img {
    width: 40px;
    height: 40px;
  }

  span {
    font-size: 1.25rem;
    font-weight: 700;
    color: #1f2937;
  }
`;

const FormHeader = styled.div`
  margin-bottom: 2rem;
`;

const FormTitle = styled.h2`
  font-size: 1.5rem;
  font-weight: 700;
  color: #1f2937;
  margin: 0 0 0.375rem;
`;

const FormSubtitle = styled.p`
  font-size: 0.9rem;
  color: #6b7280;
  margin: 0;
`;

const StyledForm = styled.form`
  display: flex;
  flex-direction: column;
  gap: 1.25rem;
`;

const FieldGroup = styled.div`
  display: flex;
  flex-direction: column;
  gap: 0.375rem;
`;

const StyledLabel = styled.label`
  font-size: 0.875rem;
  font-weight: 500;
  color: #374151;
`;

const InputWrapper = styled.div`
  position: relative;
  display: flex;
  align-items: center;
`;

const StyledInput = styled.input`
  width: 100%;
  padding: 0.75rem 1rem;
  padding-right: ${props => props.$hasToggle ? '2.75rem' : '1rem'};
  border: 1px solid ${props => props.$invalid ? '#ef4444' : '#d1d5db'};
  border-radius: 8px;
  font-size: 1rem;
  color: #1f2937;
  background: #fff;
  box-sizing: border-box;
  transition: border-color 0.2s, box-shadow 0.2s;

  &::placeholder {
    color: #9ca3af;
  }

  &:focus {
    outline: none;
    border-color: ${props => props.$invalid ? '#ef4444' : 'rgb(41, 162, 184)'};
    box-shadow: 0 0 0 3px ${props => props.$invalid ? 'rgba(239, 68, 68, 0.15)' : 'rgba(41, 162, 184, 0.15)'};
  }
`;

const PasswordToggle = styled.button`
  position: absolute;
  right: 0.75rem;
  background: none;
  border: none;
  padding: 0.25rem;
  cursor: pointer;
  color: #6b7280;
  display: flex;
  align-items: center;
  justify-content: center;
  border-radius: 4px;

  &:hover {
    color: #374151;
  }

  &:focus-visible {
    outline: 2px solid rgb(41, 162, 184);
    outline-offset: 2px;
  }
`;

const FieldError = styled.span`
  font-size: 0.8rem;
  color: #ef4444;
`;

const ForgotPasswordLink = styled.button`
  background: none;
  border: none;
  padding: 0;
  font-size: 0.875rem;
  color: rgb(41, 162, 184);
  cursor: pointer;
  text-align: right;
  align-self: flex-end;
  margin-top: -0.5rem;

  &:hover {
    color: rgb(21, 107, 122);
    text-decoration: underline;
  }

  &:focus-visible {
    outline: 2px solid rgb(41, 162, 184);
    outline-offset: 2px;
    border-radius: 2px;
  }
`;

const SubmitButtonWrapper = styled.div`
  margin-top: 0.5rem;

  button {
    width: 100%;
    padding: 0.875rem;
    font-size: 1rem;
  }
`;

const LoginStyles = {
  LoginPage,
  BrandPanel,
  BrandLogo,
  BrandTitle,
  BrandTagline,
  FeatureList,
  FeatureItem,
  FormPanel,
  FormCard,
  MobileBrand,
  FormHeader,
  FormTitle,
  FormSubtitle,
  StyledForm,
  FieldGroup,
  StyledLabel,
  InputWrapper,
  StyledInput,
  PasswordToggle,
  FieldError,
  ForgotPasswordLink,
  SubmitButtonWrapper,
};

export default LoginStyles;
