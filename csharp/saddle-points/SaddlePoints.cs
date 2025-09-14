public static class SaddlePoints
{
    public static IEnumerable<(int, int)> Calculate(int[,] matrix)
    {
        int rows = matrix.GetLength(0);
        int cols = matrix.GetLength(1);

        int[] rowMax = new int[rows];
        int[] colMin = new int[cols];

        //Tallest in East & West, aka Max in Row
        for (int r = 0; r < rows; r++)
        {
            int max = int.MinValue;
            for (int c = 0; c < cols; c++)
            {
                max = Math.Max(max, matrix[r, c]);
            }
            rowMax[r] = max;
        }
        //Shorthest in North & South, aka Min in Col
        for (int c = 0; c < cols; c++)
        {
            int min = int.MaxValue;
            for (int r = 0; r < rows; r++)
            {
                min = Math.Min(min, matrix[r, c]);
            }
            colMin[c] = min;
        }
        for (int r = 0; r < rows; r++)
        {
            for (int c = 0; c < cols; c++)
            {
                if (matrix[r, c] == rowMax[r] && matrix[r, c] == colMin[c])
                {
                    yield return (r + 1, c + 1);
                }
            }
        }
    }
}
