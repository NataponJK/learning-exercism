using System.Text;

public static class RunLengthEncoding
{
    public static string Encode(string input)
    {
        if (string.IsNullOrEmpty(input))
        {
            return string.Empty;
        }
        var encoded = new StringBuilder();
        int count = 1;

        for (int i = 0; i < input.Length; i++)
        {
            if (i + 1 < input.Length)
            {
                if (input[i] == input[i + 1])
                {
                    count++;
                }
                else
                {
                    if (count > 1)
                    {
                        encoded.Append(count);
                    }
                    encoded.Append(input[i]);
                    count = 1;
                }
            }
        }
        if (count > 1)
        {
            encoded.Append(count);
        }
        encoded.Append(input[^1]);
        return encoded.ToString();
    }

    public static string Decode(string input)
    {
        if (string.IsNullOrEmpty(input))
        {
            return string.Empty;
        }
        var decoded = new StringBuilder();
        int count = 0;
        foreach (char c in input)
        {
            if (char.IsDigit(c))
            {
                count = count * 10 + (c - '0');
            }
            else
            {
                if (count > 0)
                {
                    decoded.Append(c, count);
                    count = 0;
                }
                else
                {
                    decoded.Append(c);
                }
            }
        }
        return decoded.ToString();
    }
}
