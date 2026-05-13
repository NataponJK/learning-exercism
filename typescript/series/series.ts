export class Series {
  private readonly digits: number[];
  
  constructor(series: string) {
    if (!series) throw new Error(`series cannot be empty`);
    this.digits = [...series].map(Number);
  }

  //reminder: return as metrix
  slices(sliceLength: number): number[][] {
    if (sliceLength === 0) throw new Error(`slice length cannot be zero`);
    if (sliceLength < 0) throw new Error(`slice length cannot be negative`);
    if (sliceLength > this.digits.length) throw new Error(`slice length cannot be greater than series length`);

    const numberOfSlices = this.digits.length - sliceLength + 1;
    return Array.from({ length: numberOfSlices }, 
                      (_, i): number[] => this.digits.slice(i, i + sliceLength)
    );
  }
}
