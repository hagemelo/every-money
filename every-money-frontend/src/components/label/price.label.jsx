import { ValueContainer, CurrencySymbol, Amount, Decimal } from './price.label.styles.jsx';

const PriceLabel = ({ valor }) => {
  console.log('Valor recebido:', valor);
  const partes = valor.toFixed(2).split('.');
  const valores = Array.isArray(partes) ? partes : [partes, '00'];
  console.log('Partes:', partes);
  console.log('Valores:', valores);
  return (
    <ValueContainer>
      <CurrencySymbol>R$</CurrencySymbol>
      <Amount>
        {valores[0]}
        <Decimal>,{valores[1]}</Decimal>
      </Amount>
    </ValueContainer>
  );
};

export default PriceLabel;