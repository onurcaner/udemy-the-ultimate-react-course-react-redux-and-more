export function calculateAverage(...numbers: number[]): number {
  const { length } = numbers;
  return numbers.reduce((sum, number) => sum + number / length, 0);
}
