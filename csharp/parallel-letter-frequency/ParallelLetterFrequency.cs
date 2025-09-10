public static class ParallelLetterFrequency
{
    public static Dictionary<char, int> Calculate(IEnumerable<string> texts)
    =>  texts.AsParallel()
        .SelectMany(text => text.ToLower())
        .Where(character => char.IsLetter(character))
        .GroupBy(character => character)
        .ToDictionary(group => group.Key, group => group.Count());
}