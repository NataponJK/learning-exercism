public static class FlowerField
{
    public static string[] Annotate(string[] input)
    {
        //Reminder input = garden
        if (input == null || input.Length == 0)
        {
            return [];
        }
        int rows = input.Length;
        int cols = input[0].Length;
        string[] result = new string[rows];

        for (int r = 0; r < rows; r++)
        {
            char[] rowChar = input[r].ToCharArray();
            for (int c = 0; c < cols; c++)
            {
                if (rowChar[c] == ' ')
                {
                    int adjacentFlower = CountAdjacentFlower(input, r, c, rows, cols);
                    if (adjacentFlower > 0)
                    {
                        rowChar[c] = adjacentFlower.ToString()[0];
                    }
                }
            }
            result[r] = new string(rowChar);
        }
        return result;
    }

    private static int CountAdjacentFlower(string[] garden, int r, int c,int rows, int cols)
    {
        int count = 0;

        for (int dr = -1; dr <= 1; dr++)//rDelta
        {
            for (int dc = -1; dc <= 1; dc++)//cDelta
            {
                if (dr == 0 && dc == 0) continue;
                int nr = r + dr; //neighborRow
                int nc = c + dc; //neighbotCol

                if (nr >= 0 && nr < rows && nc >= 0 && nc < cols && garden[nr][nc] == '*')//nr before nc
                {
                    count++;
                }
            }
        }
        return count;
    }
}
