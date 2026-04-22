//
// This is only a SKELETON file for the 'Protein Translation' exercise. It's been provided as a
// convenience to get you started writing code faster.
//
const CODON_MAP = {
  AUG: `Methionine`,
  UUU: `Phenylalanine`, UUC: `Phenylalanine`,
  UUA: `Leucine`, UUG: `Leucine`,
  UCU: `Serine`, UCC: `Serine`, UCA: `Serine`, UCG: `Serine`,
  UAU: `Tyrosine`, UAC: `Tyrosine`,
  UGU: `Cysteine`, UGC: `Cysteine`,
  UGG: `Tryptophan`,
  UAA: `STOP`, UAG: `STOP`, UGA: `STOP`
}

export const translate = (rna = ``) => {
  const proteins = [];
  const codons = rna.match(/.{1,3}/g) || [];
  for (const codon of codons) {
    const protein = CODON_MAP[codon];
    if (!protein) throw new Error(`Invalid codon`);
    if (protein === `STOP`) break;
    proteins.push(protein);
  }
  return proteins;
};
