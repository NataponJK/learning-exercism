public static class Transpose
{
    public static string String(string input)
    {
        string[] rows = input.Split("\n");
        string result = "";
        int maxRowLength = 0;
        foreach (string row in rows)
        {
            if (row.Length >= maxRowLength)
            {
                maxRowLength = row.Length;
            }
        }
        for (int i = 0; i < maxRowLength; i++)
        {
            for (int j = 0; j < rows.Length; j++)
            {
                string row = rows[j];
                if (i < row.Length)
                {
                    result += row[i];
                }
                else
                {
                    if (rows[j..].Any(row => i < row.Length))
                    {
                        result += " ";
                    }
                }
            }
            if (i < maxRowLength - 1)
            {
                result += "\n";
            }
        }
        return result;
    }
}