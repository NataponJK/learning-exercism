public static class ArmstrongNumbers
{
    public static bool IsArmstrongNumber(int number)
    {
        string numberAsString = number.ToString();
        int power = numberAsString.Length;

        double sumOfPowers = numberAsString.Sum(digitChar =>
        {
           int digit = (int)Char.GetNumericValue(digitChar);
           return Math.Pow(digit, power); 
        });

        return number == (int)sumOfPowers;
    }
}