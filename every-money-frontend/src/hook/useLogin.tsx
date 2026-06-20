import { useState } from 'react';
import { useLoginService } from '../share/context/context.tsx';
import { useNavigate } from 'react-router-dom';
import { useToast } from '../components/toast/toast.jsx';

const EMAIL_REGEX = /^[^\s@]+@[^\s@]+\.[^\s@]+$/;

export const useLogin = () => {
  const loginService = useLoginService();
  const navigate = useNavigate();
  const { showToast } = useToast();
  const [email, setEmail] = useState('');
  const [senha, setSenha] = useState('');
  const [loading, setLoading] = useState(false);
  const [shake, setShake] = useState(false);
  const [fieldErrors, setFieldErrors] = useState({ email: '', senha: '' });

  const clearFieldError = (field: 'email' | 'senha') => {
    setFieldErrors(prev => ({ ...prev, [field]: '' }));
  };

  const handleEmailChange = (value: string) => {
    setEmail(value);
    clearFieldError('email');
  };

  const handleSenhaChange = (value: string) => {
    setSenha(value);
    clearFieldError('senha');
  };

  const validate = () => {
    const errors = { email: '', senha: '' };
    let valid = true;

    if (!email.trim()) {
      errors.email = 'Informe seu email.';
      valid = false;
    } else if (!EMAIL_REGEX.test(email.trim())) {
      errors.email = 'Informe um email válido.';
      valid = false;
    }

    if (!senha) {
      errors.senha = 'Informe sua senha.';
      valid = false;
    }

    setFieldErrors(errors);
    return valid;
  };

  const triggerShake = () => {
    setShake(true);
    setTimeout(() => setShake(false), 400);
  };

  const handleSubmit = async (e: React.FormEvent) => {
    e.preventDefault();

    if (!validate()) {
      triggerShake();
      return;
    }

    setLoading(true);

    try {
      const result = await loginService.login({ email: email.trim(), senha });

      if (!result) {
        setFieldErrors({ email: '', senha: 'Email ou senha inválidos.' });
        showToast('Email ou senha inválidos.', 'error');
        triggerShake();
        return;
      }

      showToast('Login realizado com sucesso!');
      navigate('/home');
    } catch {
      showToast('Ocorreu um erro ao entrar. Tente novamente.', 'error');
      triggerShake();
    } finally {
      setLoading(false);
    }
  };

  const handleForgotPassword = () => {
    showToast('Recuperação de senha em breve.', 'error');
  };

  return {
    email,
    senha,
    loading,
    shake,
    fieldErrors,
    handleSubmit,
    handleEmailChange,
    handleSenhaChange,
    handleForgotPassword,
  };
};
