export const mToKm = (m: number): string => {
  if (!m) return '0';
  return Math.floor(m / 1000).toString();
};