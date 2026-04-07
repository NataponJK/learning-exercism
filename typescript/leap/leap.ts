export function isLeap(year: number): boolean {
  return year % 100 === 0 ? year % 400 === 0 : year % 4 === 0;
}
// Ternary Operator
// export const isLeap = (year: number): boolean => year % 100 === 0 ? year % 400 === 0 : year % 4 === 0;