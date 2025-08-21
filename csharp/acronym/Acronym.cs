using System.Text;

public static class Acronym
{
    public static string Abbreviate(string phrase)
    {
        string[] sentence = phrase.Split([' ', '-', '_'], StringSplitOptions.RemoveEmptyEntries);
        string abbreviation = "";
        foreach (string word in sentence)
        {
            abbreviation += word[0].ToString().ToUpper();
        }
        return abbreviation;
    }
}