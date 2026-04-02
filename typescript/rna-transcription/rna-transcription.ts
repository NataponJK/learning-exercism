const DNA_TO_RNA: Record<string, string> = {
  G: `C`,
  C: `G`,
  T: `A`,
  A: `U`,
};

export function toRna(dna: string): string {
  return dna.split('')
            .map((nucleotide) => {
            const rna = DNA_TO_RNA[nucleotide];
            if (!rna) throw new Error(`Invalid input DNA.`);
            return rna
  }).join('');
}
