import { KpiCard, KpiLabel, KpiValue } from './kpi.card.styles.jsx';
import { formatCurrency } from '../../share/utils/currency.utils';

function KpiCardComponent({ label, value, background }) {
  return (
    <KpiCard $background={background}>
      <KpiLabel>{label}</KpiLabel>
      <KpiValue>{formatCurrency(Number(value ?? 0))}</KpiValue>
    </KpiCard>
  );
}

export default KpiCardComponent;
