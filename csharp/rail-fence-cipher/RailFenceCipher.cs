using System.Text;

public class RailFenceCipher
{
    private readonly int _rails;
    public RailFenceCipher(int rails)
    {
        _rails = rails;
    }

    public string Encode(string input)
    {
        string encodedText = "";
        int n = input.Length;
        for (int row = 0; row < _rails; row++)
        {
            int step1 = 2 * (_rails - 1 - row);
            int step2 = 2 * row;
            int pos = row;
            bool toggle = true;
            while (pos < n)
            {
                encodedText += input[pos];
                if (row == 0 || row == _rails - 1)
                {
                    pos += 2 * (_rails - 1);
                }
                else
                {
                    pos += toggle ? step1 : step2;
                    toggle = !toggle;
                }
            }
        }
        return encodedText;
    }

    public string Decode(string input)
    {
        if (_rails <= 1)
        {
            return input;
        }
        int n = input.Length;
        char[] decodedText = new char[n];
        int index = 0;
        for (int row = 0; row < _rails; row++)
        {
            int step1 = 2 * (_rails - 1 - row);
            int step2 = 2 * row;
            int pos = row;
            bool toggle = true;

            while (pos < n)
            {
                decodedText[pos] = input[index++];
                if (row == 0 || row == _rails - 1)
                {
                    pos += 2 * (_rails - 1);
                }
                else
                {
                    pos += toggle ? step1 : step2;
                    toggle = !toggle;
                }
            }
        }
        return new string(decodedText);
    }
}