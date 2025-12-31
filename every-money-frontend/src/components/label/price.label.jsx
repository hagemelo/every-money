import { ValueContainer, CurrencySymbol, Amount, Decimal } from './price.label.styles.jsx';

const PriceLabel = ({ valor }) => {

  const partes = valor.toFixed(2).split('.');
  const valores = Array.isArray(partes) ? partes : [partes, '00'];

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