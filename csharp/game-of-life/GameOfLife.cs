public static class GameOfLife
{
    public static int[,] Tick(int[,] matrix)
    {
        int rows = matrix.GetLength(0);
        int cols = matrix.GetLength(1);

        var nextGen = new int[rows, cols];
        for (int row = 0; row < rows; row++)
        {
            for (int col = 0; col < cols; col++)
            {
                int liveNeighbors = CountLiveNeighbor(matrix, row, col);
                bool isAlive = matrix[row, col] == 1;

                if (isAlive && (liveNeighbors == 2 || liveNeighbors == 3))
                {
                    nextGen[row, col] = 1;
                }
                else if (!isAlive && liveNeighbors == 3)
                {
                    nextGen[row, col] = 1;
                }
            }
        }
        return nextGen;
    }
    private static int CountLiveNeighbor(int[,] matrix, int row, int col)
    {
        int rows = matrix.GetLength(0);
        int cols = matrix.GetLength(1);
        int liveCount = 0;
        for (int i = -1; i <= 1; i++)
        {
            for (int j = -1; j <= 1; j++)
            {
                if (i == 0 && j == 0) continue;
                int neighborRow = row + i;
                int neighborCol = col + j;
                if (neighborRow >= 0 && neighborRow < rows &&
                    neighborCol >= 0 && neighborCol < cols)
                {
                    if (matrix[neighborRow, neighborCol] == 1)
                    {
                        liveCount++;
                    }
                }
            }
        }
        return liveCount;
    }
}
