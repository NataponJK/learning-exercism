using System.Text;

public static class Raindrops
{
    public static string Convert(int number)
    {
        var result = new StringBuilder();
        if (number % 3 == 0) result.Append("Pling");
        if (number % 5 == 0) result.Append("Plang");
        if (number % 7 == 0) result.Append("Plong");

        return result.Length > 0 ? result.ToString() : number.ToString();
    }
}