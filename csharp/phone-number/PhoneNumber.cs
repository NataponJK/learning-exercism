using System.Text.RegularExpressions;

public class PhoneNumber
{
    public static string Clean(string phoneNumber)
    {
        string cleanedNumber = Regex.Replace(phoneNumber, @"\D", "");
        if (cleanedNumber.Length == 11)
        {
            cleanedNumber = cleanedNumber.StartsWith("1") ? cleanedNumber[1..] : throw new ArgumentException("Invalid number lenght with country code.");
        }
        if (cleanedNumber.Length != 10) throw new ArgumentException("Invalid number length.");
        if (cleanedNumber[0] == '0' || cleanedNumber[0] == '1') throw new ArgumentException("Area code cannot start with 0 or 1.");
        if (cleanedNumber[3] == '0' || cleanedNumber[3] == '1') throw new ArgumentException("Exchange code cannot start with 0 or 1.");
        return cleanedNumber;
    }
}