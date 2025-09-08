public static class Rectangles
{
    public static int Count(string[] rows)
    {
        if (rows == null || rows.Length < 2)
        {
            return 0;
        }
        int rectangleCount = 0;
        var corners = FindCorners(rows);

        foreach (var p1 in corners)
        {
            foreach (var p2 in corners)
            {
                if (p1.Item1 < p2.Item1 && p1.Item2 < p2.Item2)
                {
                    if (isRectangle(rows, p1, p2))
                    {
                        rectangleCount++;
                    }
                }
            }
        }
        return rectangleCount;

    }

    private static List<(int, int)> FindCorners(string[] rows)
    {
        List<(int, int)> corners = new();
        for (int row = 0; row < rows.Length; row++)
        {
            for (int col = 0; col < rows[0].Length; col++)
            {
                if (rows[row][col] == '+')
                {
                    corners.Add((row, col));
                }
            }
        }
        return corners;
    }
    private static bool isRectangle(string[] rows, (int, int) p1, (int, int) p2)
    {
        int x1 = p1.Item1;
        int y1 = p1.Item2;
        int x2 = p2.Item1;
        int y2 = p2.Item2;
        //check if other two corners are '+'
        if (rows[x1][y2] != '+' || rows[x2][y1] != '+')
        {
            return false;
        }
        //check top and bottom have horizontal lines; 
        for (int y = y1 + 1; y < y2; y++)
        {
            if (rows[x1][y] != '-' && rows[x1][y] != '+') return false;
            if (rows[x2][y] != '-' && rows[x2][y] != '+') return false;
        }
        //check left and right have vertical lines;
        for (int x = x1 + 1; x < x2; x++)
        {
            if (rows[x][y1] != '|' && rows[x][y1] != '+') return false;
            if (rows[x][y2] != '|' && rows[x][y2] != '+') return false;
        }
        return true;
    }
}