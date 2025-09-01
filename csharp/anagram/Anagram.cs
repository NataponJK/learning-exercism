public class Anagram
{
    private string _baseWord;
    private string _sortedBaseWord;
    public Anagram(string baseWord)
    {
        _baseWord = baseWord.ToLower();
        _sortedBaseWord = SortString(_baseWord);
    }

    public string[] FindAnagrams(string[] potentialMatches)
    {
        List<string> anargrams = new();
        foreach (var word in potentialMatches)
        {
            if (word.ToLower() == _baseWord)
            {
                continue;
            }
            var sortedWord = SortString(word.ToLower());
            if (sortedWord == _sortedBaseWord)
            {
                anargrams.Add(word);
            }
        }
        return anargrams.ToArray();
    }

    private static string SortString(string input)
    {
        char[] characters = input.ToCharArray();
        Array.Sort(characters);
        return new string(characters);
    }
}