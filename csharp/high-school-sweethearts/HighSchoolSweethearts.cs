using System.Globalization;

public static class HighSchoolSweethearts
{
    public static string DisplaySingleLine(string studentA, string studentB)
    {
        string leftSpace = new(' ', 29 - studentA.Length);
        string rightSpace = new(' ', 29 - studentB.Length);
        return $"{leftSpace}{studentA} ♡ {studentB}{rightSpace}";
    }

    public static string DisplayBanner(string studentA, string studentB)
    =>
    $@"
     ******       ******
   **      **   **      **
 **         ** **         **
**            *            **
**                         **
**     {studentA.Trim()}  +  {studentB.Trim()}     **
 **                       **
   **                   **
     **               **
       **           **
         **       **
           **   **
             ***
              *
";
    public static string DisplayGermanExchangeStudents(string studentA
        , string studentB, DateTime start, float hours)
        => string.Format(new CultureInfo("de-DE"),
        "{0} and {1} have been dating since {2:d} - that's {3:n2} hours", studentA, studentB, start, hours);
}
