public static class Luhn
{
    public static bool IsValid(string number)
    {
        string cleanedNumber = number.Replace(" ", "");
        if (cleanedNumber.Length < 2)
        {
            return false;
        }
        int sum = 0;
        bool doubleDigit = false;

        for (int i = cleanedNumber.Length - 1; i >= 0; i--)
        {
            char c = cleanedNumber[i];
            if (!char.IsDigit(c))
            {
                return false;
            }
            int digit = c - '0';
            if (doubleDigit)
            {
                digit *= 2;
                if (digit > 9)
                {
                    digit -= 9;
                }
            }
            sum += digit;
            doubleDigit = !doubleDigit;
        }
        return (sum % 10 == 0);
    }
}