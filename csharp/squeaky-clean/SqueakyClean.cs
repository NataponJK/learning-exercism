using System.Text;

public static class Identifier
{
    public static string Clean(string identifier)
    {
        StringBuilder newString = new();
        for (int i = 0; i < identifier.Length; i++)
        {
            char c = identifier[i];
            if (c >= 'α' && c <= 'ω')
            {
                continue;
            }
            if (Char.IsWhiteSpace(c))
            {
                newString.Append('_');
            }
            else if (Char.IsControl(c))
            {
                newString.Append("CTRL");
            }
            else if (c == '-')
            {
                if (i + 1 < identifier.Length)
                {
                    newString.Append(Char.ToUpperInvariant(identifier[i + 1]));
                    i++;
                }
                continue;
            }
            else if (Char.IsLetter(c))
            {
                newString.Append(c);
            }

        }
        return newString.ToString();
    }
}
