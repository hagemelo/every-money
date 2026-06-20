import PriceLabel from '../label/price.label';
import { formatCurrency } from '../../share/utils/currency.utils';
import { getProgressColor } from '../../share/utils/budget.utils';
import {
  CardContainer,
  CategoryBadge,
  Title,
  Content,
  ProgressBarContainer,
  ProgressBarFill,
  ProgressText,
} from './orcamento.card.styles.jsx';

const OrcamentoCard = ({ orcamento, gasto = 0 }) => {
  const limite = Number(orcamento.limite);
  const percent = limite > 0 ? (gasto / limite) * 100 : 0;
  const color = getProgressColor(percent);

  return (
    <CardContainer borderColor={color}>
      <CategoryBadge>{orcamento.tipoCategoria}</CategoryBadge>
      <Title>Limite mensal</Title>
      <Content>
        <PriceLabel valor={limite} />
      </Content>
      <ProgressBarContainer>
        <ProgressBarFill $percent={percent} $color={color} />
      </ProgressBarContainer>
      <ProgressText>
        {Math.round(percent)}% utilizado · {formatCurrency(gasto)} de {formatCurrency(limite)}
      </ProgressText>
    </CardContainer>
  );
};

export default OrcamentoCard;
