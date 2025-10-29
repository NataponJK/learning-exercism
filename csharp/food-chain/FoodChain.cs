public static class FoodChain
{
    private static readonly string[] foodChain =
    ["fly", "spider", "bird", "cat", "dog", "goat", "cow", "horse"];

    private static string Phrase(string animal)
    => animal switch
    {
        "spider" => "wriggled and jiggled and tickled inside her.",
        "bird" => "How absurd to swallow a bird!",
        "cat" => "Imagine that, to swallow a cat!",
        "dog" => "What a hog, to swallow a dog!",
        "goat" => "Just opened her throat and swallowed a goat!",
        "cow" => "I don't know how she swallowed a cow!",
        _ => throw new ArgumentException($"No {animal}")
    };
    public static string Recite(int verseNumber)
    {
        if (verseNumber == 1)
            return $"I know an old lady who swallowed a fly.\nI don't know why she swallowed the fly. Perhaps she'll die.";
        if (verseNumber == 8)
            return $"I know an old lady who swallowed a horse.\nShe's dead, of course!";

        string animal = foodChain[verseNumber - 1];
        string result = $"I know an old lady who swallowed a {animal}.";
        result += animal == "spider" ? $"\nIt {Phrase(animal)}" : $"\n{Phrase(animal)}";

        for (int i = verseNumber - 1; i > 0; i--)
        {
            result += $"\nShe swallowed the {foodChain[i]} to catch the {foodChain[i - 1]}";
            result += foodChain[i - 1] == "spider" ? $" that {Phrase(foodChain[i - 1])}" : ".";
        }
        result += "\nI don't know why she swallowed the fly. Perhaps she'll die.";
        return result;
    }

    public static string Recite(int startVerse, int endVerse)
    => string.Join("\n\n", Enumerable.Range(startVerse, endVerse - startVerse + 1).Select(i => Recite(i)));
}