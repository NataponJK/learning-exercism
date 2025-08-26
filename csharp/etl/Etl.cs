public static class Etl
{
    public static Dictionary<string, int> Transform(Dictionary<int, string[]> old)
    {
        Dictionary<string, int> newDictionary = new();
        foreach (var scoreLetters in old)
        {
            int score = scoreLetters.Key;
            string[] letters = scoreLetters.Value;
            foreach (string letter in letters)
            {
                newDictionary.Add(letter.ToLower(), score);
            }
        }
        return newDictionary;
    }
}