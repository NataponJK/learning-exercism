public static class Proverb
{
    public static string[] Recite(string[] subjects)
    {
        if (subjects.Length == 0)
        {
            return [];
        }
        List<string> proverb = new();
        for (int i = 0; i < subjects.Length - 1; i++)
        {
            proverb.Add($"For want of a {subjects[i]} the {subjects[i + 1]} was lost.");
        }
        proverb.Add($"And all for the want of a {subjects[0]}.");
        return proverb.ToArray();
    }
}