using System.Text;

public static class OcrNumbers
{
    private static readonly Dictionary<string, char> DigitPatterns = new()
    {
        { " _ | ||_|", '0' },
        { "     |  |", '1' },
        { " _  _||_ ", '2' },
        { " _  _| _|", '3' },
        { "   |_|  |", '4' },
        { " _ |_  _|", '5' },
        { " _ |_ |_|", '6' },
        { " _   |  |", '7' },
        { " _ |_||_|", '8' },
        { " _ |_| _|", '9' }
    };
    public static string Convert(string input)
    {
        var lines = input.Split('\n');

        if (lines.Length % 4 != 0) throw new ArgumentException();

        var result = new List<string>();
        for (int i = 0; i < lines.Length; i += 4)
        {
            var ocrBlock = lines.Skip(i).Take(4).ToArray();
            result.Add(ParseOcrBlack(ocrBlock));
        }
        return string.Join(",", result);
    }
    private static string ParseOcrBlack(string[] block)
    {
        if(block[0].Length % 3 != 0) throw new ArgumentException();

        var resultBuilder = new StringBuilder();
        int digiCount = block[0].Length / 3;

        for (int i = 0; i < digiCount; i++)
        {
            int startCol = i * 3;
            var pattern = new StringBuilder();
            pattern.Append(block[0].AsSpan(startCol, 3));
            pattern.Append(block[1].AsSpan(startCol, 3));
            pattern.Append(block[2].AsSpan(startCol, 3));

            if (DigitPatterns.TryGetValue(pattern.ToString(), out char digit)) resultBuilder.Append(digit);
            else resultBuilder.Append('?');
        }
        return resultBuilder.ToString();
    }
}