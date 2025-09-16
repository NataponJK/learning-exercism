public static class PigLatin
{
    private static readonly HashSet<char> _vowels = ['a', 'e', 'i', 'o', 'u'];
    public static string Translate(string text)
    {
        if (string.IsNullOrEmpty(text)) return text;
        var words = text.Split(' ', StringSplitOptions.None);
        for (int w = 0; w < words.Length; w++)
        {
            words[w] = TranslateWord(words[w]);
        }
        return string.Join(' ', words);
    }
    private static string TranslateWord(string word)
    {
        if (string.IsNullOrEmpty(word)) return word;
        string lower = word.ToLower();
        if (_vowels.Contains(lower[0]) || lower.StartsWith("xr") || lower.StartsWith("yt"))
        {
            return lower + "ay";
        }
        int split = -1;
        for (int i = 0; i < lower.Length; i++)
        {
            char c = lower[i];
            if (_vowels.Contains(c) || (c == 'y' && i > 0))
            {
                split = i;
                break;
            }
        }
        if (split == -1)
        {
            split = lower.Length;
        }
        if (split > 0 && split < lower.Length &&
        lower[split - 1] == 'q' && lower[split] == 'u')
        {
            split++;
        }
        return lower[split..] + lower[..split] + "ay";
    }
}