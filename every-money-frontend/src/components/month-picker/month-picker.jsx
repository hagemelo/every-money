import { addMonths, formatMesReferenciaLabel } from '../../share/utils/date.utils';
import { MonthPickerContainer, MonthLabel, MonthButton } from './month-picker.styles.jsx';

function MonthPicker({ mesReferencia, onChange }) {
    return (
        <MonthPickerContainer>
            <MonthButton
                type="button"
                onClick={() => onChange(addMonths(mesReferencia, -1))}
                aria-label="Mês anterior"
            >
                &#8249;
            </MonthButton>
            <MonthLabel>{formatMesReferenciaLabel(mesReferencia)}</MonthLabel>
            <MonthButton
                type="button"
                onClick={() => onChange(addMonths(mesReferencia, 1))}
                aria-label="Próximo mês"
            >
                &#8250;
            </MonthButton>
        </MonthPickerContainer>
    );
}

export default MonthPicker;
