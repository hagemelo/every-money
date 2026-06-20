import React, { useState } from 'react';
import { FiEye, FiEyeOff } from 'react-icons/fi';
import LoginStyles from './login.styles';
import { useLogin } from '../../hook/useLogin.tsx';
import Button from '../../components/button/button.jsx';
import logoIcon from '../../assets/logo192.png';

const FEATURES = [
  'Orçamentos mensais',
  'Controle de transações',
  'Múltiplas contas',
];

const Login = () => {
  const {
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
  } = LoginStyles;

  const {
    email,
    senha,
    loading,
    shake,
    fieldErrors,
    handleSubmit,
    handleEmailChange,
    handleSenhaChange,
    handleForgotPassword,
  } = useLogin();

  const [showPassword, setShowPassword] = useState(false);

  return (
    <LoginPage>
      <BrandPanel>
        <BrandLogo src={logoIcon} alt="Every Money" />
        <BrandTitle>Every Money</BrandTitle>
        <BrandTagline>
          Controle suas finanças com simplicidade e clareza.
        </BrandTagline>
        <FeatureList>
          {FEATURES.map(feature => (
            <FeatureItem key={feature}>{feature}</FeatureItem>
          ))}
        </FeatureList>
      </BrandPanel>

      <FormPanel>
        <FormCard $shake={shake}>
          <MobileBrand>
            <img src={logoIcon} alt="Every Money" />
            <span>Every Money</span>
          </MobileBrand>

          <FormHeader>
            <FormTitle>Bem-vindo de volta</FormTitle>
            <FormSubtitle>Acesse sua conta para continuar</FormSubtitle>
          </FormHeader>

          <StyledForm onSubmit={handleSubmit} noValidate>
            <FieldGroup>
              <StyledLabel htmlFor="email">Email</StyledLabel>
              <StyledInput
                type="email"
                id="email"
                name="email"
                value={email}
                onChange={(e) => handleEmailChange(e.target.value)}
                placeholder="voce@exemplo.com"
                autoComplete="email"
                aria-invalid={!!fieldErrors.email}
                aria-describedby={fieldErrors.email ? 'email-error' : undefined}
                $invalid={!!fieldErrors.email}
                disabled={loading}
              />
              {fieldErrors.email && (
                <FieldError id="email-error" role="alert">
                  {fieldErrors.email}
                </FieldError>
              )}
            </FieldGroup>

            <FieldGroup>
              <StyledLabel htmlFor="senha">Senha</StyledLabel>
              <InputWrapper>
                <StyledInput
                  type={showPassword ? 'text' : 'password'}
                  id="senha"
                  name="senha"
                  value={senha}
                  onChange={(e) => handleSenhaChange(e.target.value)}
                  placeholder="••••••••"
                  autoComplete="current-password"
                  aria-invalid={!!fieldErrors.senha}
                  aria-describedby={fieldErrors.senha ? 'senha-error' : undefined}
                  $invalid={!!fieldErrors.senha}
                  $hasToggle
                  disabled={loading}
                />
                <PasswordToggle
                  type="button"
                  onClick={() => setShowPassword(prev => !prev)}
                  aria-label={showPassword ? 'Ocultar senha' : 'Mostrar senha'}
                  tabIndex={-1}
                >
                  {showPassword ? <FiEyeOff size={18} /> : <FiEye size={18} />}
                </PasswordToggle>
              </InputWrapper>
              {fieldErrors.senha && (
                <FieldError id="senha-error" role="alert">
                  {fieldErrors.senha}
                </FieldError>
              )}
            </FieldGroup>

            <ForgotPasswordLink type="button" onClick={handleForgotPassword}>
              Esqueceu sua senha?
            </ForgotPasswordLink>

            <SubmitButtonWrapper>
              <Button type="submit" disabled={loading}>
                {loading ? 'Entrando...' : 'Entrar'}
              </Button>
            </SubmitButtonWrapper>
          </StyledForm>
        </FormCard>
      </FormPanel>
    </LoginPage>
  );
};

export default Login;
