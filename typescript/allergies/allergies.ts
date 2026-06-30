const ALLERGENS: string[] = [
  'eggs',
  'peanuts',
  'shellfish',
  'strawberries',
  'tomatoes',
  'chocolate',
  'pollen',
  'cats'
];

export class Allergies {
  private score: number

  constructor(score: number) {
    this.score = score;
  }

  public list(): string[] {
    return ALLERGENS.filter((allergen) => this.allergicTo(allergen));
  }

  public allergicTo(allergen: string): boolean {
    const index = ALLERGENS.indexOf(allergen);
    if (index === -1) return false;

    return (this.score & (1 << index)) !== 0;
  }
}
