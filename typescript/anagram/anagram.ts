export class Anagram {
  private readonly target: string;
  private readonly sortedTarget: string;

  constructor(input: string) {
    this.target = input.toLowerCase();
    this.sortedTarget = this.sort(this.target);
  }

  private sort(word: string): string {
    return [...word].sort().join(``);
  }

  public matches(...potentials: string[]): string[] {
    return potentials.filter((word) => {
      const lowerWord = word.toLowerCase();
      //Condition 1: Must not be the same word
      if (lowerWord === this.target) return false;
      //Condition 2: Must have the same letters
      return this.sort(lowerWord) === this.sortedTarget;
    })
  }
}
