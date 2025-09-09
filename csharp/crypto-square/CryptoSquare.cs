using System.Text;

public static class CryptoSquare
{
    public static string NormalizedPlaintext(string plaintext)
    => string.Concat(plaintext.Where(char.IsLetterOrDigit)).ToLower();

    public static IEnumerable<string> PlaintextSegments(string plaintext)
    {
        plaintext = NormalizedPlaintext(plaintext);
        var c = (int)Math.Ceiling(Math.Sqrt(plaintext.Length));
        while (plaintext.Length > 0)
        {
            var takeLength = Math.Min(c, plaintext.Length);
            yield return plaintext[..takeLength];
            plaintext = plaintext[takeLength..];
        }
    }

    public static string Encoded(string plaintext)
    {
        var segments = PlaintextSegments(plaintext).ToList();
        if (segments.Count == 0)
        {
            return string.Empty;
        }
        var c = segments[0].Length;
        StringBuilder result = new();
        for (int i = 0; i < c; i++)
        {
            foreach (var segment in segments)
            {
                result.Append(segment.Length > i ? segment[i] : ' ');
            }
            if (i != c - 1)
            {
                result.Append(' ');
            }
        }
        return result.ToString();
	}

    public static string Ciphertext(string plaintext)
    => Encoded(plaintext);
}