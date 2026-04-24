export function compute(strandA: string, strandB: string): number {
  if (strandA.length !== strandB.length) throw new Error(`DNA strands must be of equal length.`);
  let distance: number = 0;
  for (let i = 0; i < strandA.length; i++){
    if (strandA[i] !== strandB[i]) distance++;
  }
  return distance;
}
