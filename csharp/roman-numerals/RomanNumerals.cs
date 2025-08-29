using System.Text;

public static class RomanNumeralExtension
{
    public static string ToRoman(this int value)
    {
        if (value < 1 || value > 3999)
        {
            return string.Empty;
        }
        Dictionary<int, string> romanNumbersDictionary = new()
        {
            { 1000, "M" }, { 900, "CM" }, { 500, "D" }, { 400, "CD" },
            { 100,"C" }, { 90, "XC" }, { 50, "L" }, { 40, "XL" },
            { 10, "X" }, { 9, "IX" }, { 5, "V" }, { 4, "IV" }, { 1 ,"I" },
        };

        StringBuilder romanNumber = new();
        foreach (var roman in romanNumbersDictionary)
        {
            while (value >= roman.Key)
            {
                romanNumber.Append(roman.Value);
                value -= roman.Key;
            }
        }
        return romanNumber.ToString();
    }
}