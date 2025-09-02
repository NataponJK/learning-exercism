public static class IsbnVerifier
{
    public static bool IsValid(string number)
    {
        string cleanedIsbn = number.Replace("-", "").ToUpper();
        if (cleanedIsbn.Length != 10)
        {
            return false;
        }
        int sum = 0;
        for (int i = 0; i < 9; i++)
        {
            if (!char.IsDigit(cleanedIsbn[i]))
            {
                return false;
            }
            sum += (cleanedIsbn[i] - '0') * (10 - i);
        }
        char lastChar = cleanedIsbn[9];
        if (char.IsDigit(lastChar))
        {
            sum += lastChar - '0';
        }
        else if (lastChar == 'X')
        {
            sum += 10;
        }
        else
        {
            return false;
        }
        return sum % 11 == 0;
    }
}