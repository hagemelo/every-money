import { useState } from 'react';
import { useLoginService } from '../share/context/context.tsx';
import { useNavigate } from 'react-router-dom';


export const useLogin = () => {
    const loginService = useLoginService();
    const navigate = useNavigate();
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
           navigate('/home');
        }, 3000);
     
       
        setTimeout(() => {
            setIsSuccessMessage(false);
            setMessage('');
        }, 5000);
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