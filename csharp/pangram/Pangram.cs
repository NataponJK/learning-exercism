public static class Pangram
{
    public static bool IsPangram(string input)
    {
        input = input.ToLower();
        for (char c = 'a'; c <= 'z'; c++)
            if (!input.Contains(c))
            {
                return false;
            }
        return true;
    }
}
