public static class Diamond
{
    public static string Make(char target)
    {
        if (target < 'A' || target > 'Z') return string.Empty;

        int n = target - 'A';
        var lines = new List<string>();

        //Generate Top half include middle line
        for (int i = 0; i <= n; i++)
        {
            char c = (char)('A' + i);
            int outer = n - i;

            if (i == 0)
            {
                lines.Add(new string(' ', outer) + c + new string(' ', outer));
            }
            else
            {
                int inner = 2 * i - 1;
                lines.Add(new string(' ', outer) + c + new string(' ', inner) + c + new string(' ', outer));
            }
        }
        //Generate bottom half, no middle line
        for (int i = n - 1; i >= 0; i--)
        {
            lines.Add(lines[i]);
        }
        return string.Join("\n", lines);
    }
}