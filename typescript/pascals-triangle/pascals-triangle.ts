export class Triangle {
    private triangle: number[][] = [];
    constructor(count: number) {
        for (let i = 0; i < count; i++) {
            const row: number[] = [1];
            for (let j = 1; j < i; j++) {
                row.push(this.triangle[i - 1][j - 1] + this.triangle[i - 1][j]);
            }
            if (i > 0) {
                row.push(1);
            }
            this.triangle.push(row);
        }
    }
    get rows(): number[][] {
        return this.triangle;
    }
    get lastRow(): number[] {
        return this.triangle[this.triangle.length - 1] || [];
    }
}
