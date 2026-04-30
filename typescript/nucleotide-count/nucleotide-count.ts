type NucleotideCount = {
  A: number;
  C: number;
  G: number;
  T: number;
}

export function nucleotideCounts(strand: string): NucleotideCount {
  const counts: NucleotideCount = { A: 0, C: 0, G: 0, T: 0};
  for (const nucleotide of strand){
    if (nucleotide in counts) {
      counts[nucleotide as keyof NucleotideCount]++;
    } else {
      throw new Error(`Invalid nucleotide in strand`);
    }
  }
  return counts;
}
