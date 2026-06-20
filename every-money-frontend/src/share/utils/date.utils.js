const MONTHS_PT = [
    'Janeiro', 'Fevereiro', 'Março', 'Abril', 'Maio', 'Junho',
    'Julho', 'Agosto', 'Setembro', 'Outubro', 'Novembro', 'Dezembro',
];

/** Formato do backend: "Junho 2026" */
export function getMesReferencia(date = new Date()) {
    const month = MONTHS_PT[date.getMonth()];
    const year = date.getFullYear();
    return `${month} ${year}`;
}

export function parseMesReferencia(mesReferencia) {
    if (!mesReferencia) {
        const now = new Date();
        return { year: now.getFullYear(), month: now.getMonth() + 1 };
    }

    if (mesReferencia.includes('-')) {
        const [year, month] = mesReferencia.split('-').map(Number);
        return { year, month };
    }

    const year = parseInt(mesReferencia.split(' ').pop(), 10);
    const monthName = mesReferencia.replace(` ${year}`, '');
    const month = MONTHS_PT.indexOf(monthName) + 1;
    return { year, month: month > 0 ? month : 1 };
}

/** Converte "Junho 2026" → "2026-06" para input type="month" */
export function toMonthInputValue(mesReferencia) {
    const { year, month } = parseMesReferencia(mesReferencia);
    return `${year}-${String(month).padStart(2, '0')}`;
}

/** Converte "2026-06" → "Junho 2026" para API do backend */
export function fromMonthInputValue(value) {
    const [year, month] = value.split('-').map(Number);
    return getMesReferencia(new Date(year, month - 1, 1));
}

export function normalizeMesReferencia(mesReferencia) {
    if (!mesReferencia) return getMesReferencia();
    if (mesReferencia.includes('-')) return fromMonthInputValue(mesReferencia);
    return mesReferencia;
}

export function formatMesReferenciaLabel(mesReferencia) {
    const { year, month } = parseMesReferencia(mesReferencia);
    const date = new Date(year, month - 1, 1);
    return date.toLocaleDateString('pt-BR', { month: 'long', year: 'numeric' });
}

export function addMonths(mesReferencia, delta) {
    const { year, month } = parseMesReferencia(mesReferencia);
    const date = new Date(year, month - 1 + delta, 1);
    return getMesReferencia(date);
}

export function toInputDate(date = new Date()) {
    return date.toISOString().split('T')[0];
}

export function getMesReferenciaFromDate(dateStr) {
    const date = new Date(dateStr + 'T00:00:00');
    return getMesReferencia(date);
}

export function transactionMatchesMesReferencia(data, mesReferencia) {
    if (!data) return false;
    const date = typeof data === 'string' ? new Date(data) : data;
    return getMesReferencia(date) === normalizeMesReferencia(mesReferencia);
}

export function mesReferenciaEquals(a, b) {
    return normalizeMesReferencia(a) === normalizeMesReferencia(b);
}
