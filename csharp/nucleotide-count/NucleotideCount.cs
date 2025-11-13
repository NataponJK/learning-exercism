public static class NucleotideCount
{
    public static IDictionary<char, int> Count(string sequence)
    {
        var nucleotideCount = new Dictionary<char, int>
        {
            {'A', 0},
            {'C', 0},
            {'G', 0},
            {'T', 0}
        };

        foreach (char nucleotide in sequence)
        {
            if (!nucleotideCount.ContainsKey(nucleotide))
            {
                throw new ArgumentException("error");
            }
            nucleotideCount[nucleotide]++;
        }
        return nucleotideCount;
    }
}