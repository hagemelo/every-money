import { transactionMatchesMesReferencia, normalizeMesReferencia } from './date.utils';

export function calcularGastoOrcamento(transacoes, orcamento, mesReferencia) {
    return transacoes
        .filter(
            (t) =>
                t.tipo === orcamento.tipoCategoria &&
                transactionMatchesMesReferencia(t.data, normalizeMesReferencia(mesReferencia))
        )
        .reduce((sum, t) => sum + Number(t.valor), 0);
}

export function calcularPercentualGasto(gasto, limite) {
    if (limite <= 0) return 0;
    return Math.min((gasto / limite) * 100, 100);
}

export function getProgressColor(percent) {
    if (percent >= 90) return '#ef4444';
    if (percent >= 70) return '#facc15';
    return '#10b981';
}
