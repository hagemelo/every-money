import { useEffect, useState } from 'react';
import { useLoginService } from '../share/context/context.tsx';


export const useLogin = () => {
    const loginService = useLoginService();
    const [email, setEmail] = useState('');
    const [password, setPassword] = useState('');
    const [message, setMessage] = useState('');
    const [isSuccessMessage, setIsSuccessMessage] = useState(false);


    const handleSubmit = async (e) => {
        e.preventDefault();

        if (!email || !password) {
        setMessage('Por favor, insira um email e senha.');
        return;
        }
    
        const result = await loginService.login(email, password);
       
        if(!result){
            setMessage('Email ou senha inválidos.');
            setIsSuccessMessage(false);
            return;
        }
        setMessage('Login realizado com sucesso!');
        setIsSuccessMessage(true);
        setEmail('');
        setPassword('');
        setTimeout(() => {
            setIsSuccessMessage(false);
            setMessage('');
        }, 4000);
    };

    return {
    email,
    password,
    message,
    isSuccessMessage,
    handleSubmit,
    setEmail,
    setPassword,
    setMessage,
    setIsSuccessMessage,
  };
};