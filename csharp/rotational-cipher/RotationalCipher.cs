using System.Text;

public static class RotationalCipher
{
    public static string Rotate(string text, int shiftKey)
    {
        string encrypted = "";
        foreach (char c in text)
        {
            if (char.IsLetter(c))
            {
                char offset = char.IsUpper(c) ? 'A' : 'a';
                char shifted = (char)(((c - offset + shiftKey) % 26) + offset);
                encrypted += shifted;
            }
            else
            {
                encrypted += c;
            }
        }
        return encrypted;
    }
}