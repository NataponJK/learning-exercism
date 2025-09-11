using System.Text;

public static class AtbashCipher
{
    private const string _alphabet = "abcdefghijklmnopqrstuvwxyz";
    private const string _reversedAlphabet = "zyxwvutsrqponmlkjihgfedcba";
    public static string Encode(string plainValue)
    {
        StringBuilder encodedText = new();
        string cleanedText = CleanText(plainValue);
        int charCount = 0;
        foreach (char c in cleanedText)
        {
            if (charCount == 5)
            {
                encodedText.Append(' ');
                charCount = 0;
            }
            if (char.IsLetter(c))
            {
                int index = _alphabet.IndexOf(char.ToLower(c));
                if (index != -1)
                {
                    encodedText.Append(_reversedAlphabet[index]);
                    charCount++;
                }
            }
            else if (char.IsDigit(c))
            {
                encodedText.Append(c);
                charCount++;
            }
        }
        return encodedText.ToString().Trim();
    }
    public static string Decode(string encodedValue)
    {
        StringBuilder decodedText = new();
        string cleanedText = CleanText(encodedValue);
        foreach (char c in cleanedText)
        {
            if (char.IsLetter(c))
            {
                int index = _reversedAlphabet.IndexOf(char.ToLower(c));
                if (index != -1)
                {
                    decodedText.Append(_alphabet[index]);
                }
            }
            else if (char.IsDigit(c))
            {
                decodedText.Append(c);
            }
        }
        return decodedText.ToString();
    }
    private static string CleanText(string input)
    {
        StringBuilder cleaned = new();
        foreach (char c in input)
        {
            if (char.IsLetterOrDigit(c))
            {
                cleaned.Append(c);
            }
        }
        return cleaned.ToString().ToLower();
    }
}
