using System.Text.RegularExpressions;

public static class WordCount
{
    public static IDictionary<string, int> CountWords(string phrase)
    {
        string cleanedPhrase = Regex.Replace(phrase.ToLower(), @"[^a-z0-9']+", " ");
        string[] words = cleanedPhrase.Split([' '], StringSplitOptions.RemoveEmptyEntries);

        Dictionary<string, int> wordCounts = [];
        foreach (string word in words)
        {
            string trimmedWord = word.Trim('\'');
            if (!string.IsNullOrWhiteSpace(trimmedWord))
            {
                if(wordCounts.ContainsKey(trimmedWord)) wordCounts[trimmedWord]++;
                else wordCounts.Add(trimmedWord, 1);
            }
        }
        return wordCounts;
    }
}