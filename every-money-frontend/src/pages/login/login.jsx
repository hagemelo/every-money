import React from 'react';
import LoginStyles from './login.styles';
import {useLogin} from '../../hook/useLogin.tsx'

const Login = () => {

  const { LoginContainer, StyledCard, StyledHeading, StyledLabel, StyledInput, StyledButton, StyledMessage } = LoginStyles
  
  const {email,
    senha,
    message,
    isSuccessMessage,
    handleSubmit,
    setEmail,
    setSenha} = useLogin();

    return (
    <LoginContainer>
      <StyledCard>
        <StyledHeading>
          Every Money
        </StyledHeading>

        {/* Display messages to the user */}
        {message && (
            <StyledMessage isSuccess={isSuccessMessage}>
                {message}
            </StyledMessage>
        )}

        <form onSubmit={handleSubmit} className="space-y-6">
          <div>
            <StyledLabel>
              Email
            </StyledLabel>
            <StyledInput
              type="email"
              id="email"
              name="email"
              value={email}
              onChange={(e) => setEmail(e.target.value)}
            placeholder="you@example.com"
              required
            />
          </div>

          <div>
            <StyledLabel htmlFor="senha">
              Senha
            </StyledLabel>
            <StyledInput
              type="password"
              id="senha"
              name="senha"
              value={senha}
              onChange={(e) => setSenha(e.target.value)}
              placeholder="••••••••"
              required
            />
          </div>

          <StyledButton>
            Entrar
          </StyledButton>
        </form>
      </StyledCard>
    </LoginContainer    >
    )
}

export default Login;