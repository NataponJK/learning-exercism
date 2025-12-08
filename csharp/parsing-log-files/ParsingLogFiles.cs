using System.Text.RegularExpressions;

public class LogParser
{
    public bool IsValidLine(string text)
    => Regex.IsMatch(text, @"^\[(TRC|DBG|INF|WRN|ERR|FTL)\]");
    public string[] SplitLogLine(string text)
    =>  Regex.Split(text, @"<[\^*=-]+>");

    public int CountQuotedPasswords(string lines)
    {
        var pattern = @""".*?password.*?""";
        MatchCollection matches = Regex.Matches(lines, pattern, RegexOptions.IgnoreCase);
        return matches.Count;
    }

    public string RemoveEndOfLineText(string line)
    {
        var pattern = @"end-of-line\d+";
        return Regex.Replace(line, pattern, "");
    }

    public string[] ListLinesWithPasswords(string[] lines)
    {
        var pattern = @"password\w+";
        for (int i = 0; i < lines.Length; i++)
        {
            Match match = Regex.Match(lines[i], pattern, RegexOptions.IgnoreCase);
            if (match == Match.Empty) lines[i] = $"--------: {lines[i]}";
            else lines[i] = $"{match.Value}: {lines[i]}";
        }
        return lines;
    }
}
