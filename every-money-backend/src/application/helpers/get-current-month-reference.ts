const months = [
    'Janeiro', 'Fevereiro', 'Março', 'Abril', 'Maio', 'Junho',
    'Julho', 'Agosto', 'Setembro', 'Outubro', 'Novembro', 'Dezembro'
  ];

function getCurrentMonthReference(): string {
  const now = new Date();
  const month = months[now.getMonth()];
  const year = now.getFullYear();
  return `${month} ${year}`;
}

function getCurrentMonthReferenceFromDate(date: Date): string {
  const now = date;
  const month = months[now.getMonth()];
  const year = now.getFullYear();
  return `${month} ${year}`;
}

export { getCurrentMonthReference, getCurrentMonthReferenceFromDate };