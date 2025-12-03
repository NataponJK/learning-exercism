using System.Text;
using System.Text.RegularExpressions;

public static class AffineCipher
{
    private static readonly string alphabet = "abcdefghijklmnopqrstuvwxyz";
    private static int GCD(int a, int b) 
    => b == 0 ? a : GCD(b, a % b);
    private static int ModInverse(int a, int m)
    {
        a %= m;
        for (int x = 1; x < m; x++)
        {
            if ((a * x) % m == 1)
                return x;
        }
        return -1;
    }
    public static string Encode(string plainText, int a, int b)
    {
        if (GCD(a, 26) != 1) throw new ArgumentException();
        plainText = Regex.Replace(plainText.ToLower(), @"[\s,.]+", string.Empty);
        StringBuilder result = new StringBuilder();
        int counter = 0;
        foreach (char c in plainText)
        {
            if (counter == 5)
            {
                result.Append(' ');
                counter = 0;
            }
            if (char.IsDigit(c))
            {
                result.Append(c);
            }
            else
            {
                int i = alphabet.IndexOf(c);
                result.Append(alphabet[(a * i + b) % 26]);
            }
            counter++;
        }
        return result.ToString();
    }
    public static string Decode(string cipheredText, int a, int b)
    {
        if (GCD(a, 26) != 1) throw new ArgumentException();
        cipheredText = Regex.Replace(cipheredText, @"[\s]+", string.Empty);
        StringBuilder result = new StringBuilder();
        foreach (char c in cipheredText)
        {
            if (char.IsDigit(c))
            {
                result.Append(c);
            }
            else
            {
                int y = alphabet.IndexOf(c);
                result.Append(alphabet[(ModInverse(a, 26) * ((y - b) % 26 + 26) % 26) % 26]);
            }
        }
        return result.ToString();
    }
}
