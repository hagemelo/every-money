import styled from 'styled-components';

const StatusLabel = styled.span`
  padding: 0.25rem 0.75rem;
  border-radius: 9999px;
  font-size: 0.875rem;
  font-weight: bold;
  text-transform: uppercase;
  letter-spacing: 0.05em;
  ${({ cor }) => {
    switch(cor) {
      case 'vermelho':
        return 'background-color: #ef4444; color: white;';
      case 'amarelo':
        return 'background-color: #facc15; color: black;';
      case 'preto':
        return 'background-color: #000000; color: white;';
      case 'azul':
        return 'background-color: #2563eb; color: white;';
      case 'verde':
        return 'background-color: #16a34a; color: white;';
      default:
        return 'background-color: #000000; color: white;';
    }
  }}
`;

const StatusTransacaoLabel = ({ status }) => {

  console.log(JSON.stringify(status));
  const getCorPorStatus = (status) => {
    switch(status) {
      case 'A vencer':
        return 'azul';
      case 'Atrasada':
        return 'amarelo';
      case 'Paga':
        return 'verde';
      case 'Recebida':
        return 'preto';
      case 'Cancelada':
        return 'vermelho';
      default:
        return 'preto';
    }
  };

  const test = getCorPorStatus(status);
  console.log('test: ', test);

  if (!status) return null;
  
  return (
    <>
      <StatusLabel cor={getCorPorStatus(status)}>
        {status}
      </StatusLabel>
    </>
  );
};

export default StatusTransacaoLabel;