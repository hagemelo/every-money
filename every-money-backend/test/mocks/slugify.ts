export default function slugify(
  value: string,
  options?: { separator?: string },
): string {
  const separator = options?.separator ?? '-';

  return value
    .normalize('NFD')
    .replace(/\p{Diacritic}/gu, '')
    .toLowerCase()
    .trim()
    .replace(/[^\p{Letter}\p{Number}]+/gu, separator)
    .replace(
      new RegExp(`^${separator}+|${separator}+$`, 'g'),
      '',
    );
}

export function slugifyWithCounter(): (value: string) => string {
  return (value: string) => slugify(value);
}
