export const formatCurrency = (value: number, locale: string) =>
  new Intl.NumberFormat(locale, {
    style: 'currency',
    currency: 'TND',
    maximumFractionDigits: 0
  }).format(value);

export const formatCompactNumber = (value: number, locale: string) =>
  new Intl.NumberFormat(locale, {
    notation: 'compact',
    maximumFractionDigits: 1
  }).format(value);

export const formatMonthLabel = (month: string, locale: string) => {
  const [year, monthNumber] = month.split('-').map(Number);
  return new Date(Date.UTC(year, (monthNumber ?? 1) - 1, 1)).toLocaleDateString(locale, {
    month: 'short'
  });
};
