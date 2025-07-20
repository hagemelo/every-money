import { useState } from 'react';
import { useLoginService } from '../share/context/context.tsx';
import { useNavigate } from 'react-router-dom';


export const useLogin = () => {
    const loginService = useLoginService();
    const navigate = useNavigate();
    const [email, setEmail] = useState('');
    const [senha, setSenha] = useState('');
    const [message, setMessage] = useState('');
    const [isSuccessMessage, setIsSuccessMessage] = useState(false);


    const handleSubmit = async (e) => {
        e.preventDefault();

        if (!email || !senha) {
        setMessage('Por favor, insira um email e senha.');
        return;
        }
    
        const result = await loginService.login({email, senha});
       
        if(!result){
            setMessage('Email ou senha inválidos.');
            setIsSuccessMessage(false);
            return;
        }
        setMessage('Login realizado com sucesso!');
        setIsSuccessMessage(true);
        setEmail('');
        setSenha('');
        setTimeout(() => {
           navigate('/home');
        }, 1000);
     
       
        setTimeout(() => {
            setIsSuccessMessage(false);
            setMessage('');
        }, 5000);
    };

    return {
    email,
    senha,
    message,
    isSuccessMessage,
    handleSubmit,
    setEmail,
    setSenha,
    setMessage,
    setIsSuccessMessage,
  };
};