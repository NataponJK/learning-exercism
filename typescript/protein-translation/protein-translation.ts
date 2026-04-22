type ProteinMap = { [key: string]: string}
const CODON_MAP: ProteinMap = {
  AUG: `Methionine`,
  UUU: `Phenylalanine`, UUC: `Phenylalanine`,
  UUA: `Leucine`, UUG: `Leucine`,
  UCU: `Serine`, UCC: `Serine`, UCA: `Serine`, UCG: `Serine`,
  UAU: `Tyrosine`, UAC: `Tyrosine`,
  UGU: `Cysteine`, UGC: `Cysteine`,
  UGG: `Tryptophan`,
  UAA: `STOP`, UAG: `STOP`, UGA: `STOP`,
}

export function translate(rna: string): string[] {
  const proteins: string[] = [];
  const codons = (rna.match(/.{1,3}/g) || []) as string[];
  for (const codon of codons){
    const protein = CODON_MAP[codon];
    if (!protein) throw new Error(`Invalid codon`);
    if (protein === `STOP`) break;
    proteins.push(protein);
  }
  return proteins;
}
