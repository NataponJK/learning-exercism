public static class ProteinTranslation
{
    public static string[] Proteins(string strand)
    {
        Dictionary<string, string> proteinMap = new()
        {
            {"AUG", "Methionine"},
            {"UUU", "Phenylalanine"},
            {"UUC", "Phenylalanine"},
            {"UUA", "Leucine"},
            {"UUG", "Leucine"},
            {"UCU", "Serine"},
            {"UCC", "Serine"},
            {"UCA", "Serine"},
            {"UCG", "Serine"},
            {"UAU", "Tyrosine"},
            {"UAC", "Tyrosine"},
            {"UGU", "Cysteine"},
            {"UGC", "Cysteine"},
            {"UGG", "Tryptophan"},
            {"UAA", "STOP"},
            {"UAG", "STOP"},
            {"UGA", "STOP"},
        };
        List<string> proteins = new();
        int i = 0;
        while (i < strand.Length)
        {
            string condon = strand.Substring(i, 3);
            if (proteinMap[condon] == "STOP")
            {
                break;
            }
            proteins.Add(proteinMap[condon]);
            i += 3;
        }
        return proteins.ToArray();
    }
}