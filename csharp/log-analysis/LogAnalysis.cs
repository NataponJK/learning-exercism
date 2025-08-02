public static class LogAnalysis 
{
    public static string SubstringAfter(this string str, string delim)
    => str.Split(delim)[1];
    public static string SubstringBetween(this string str, string beforeDelim, string afterDelim)
    => str.SubstringAfter(beforeDelim).Split(afterDelim)[0];
    public static string Message(this string str)
    => str.SubstringAfter("]: ");
    public static string LogLevel(this string str)
    => str.SubstringBetween("[", "]");
}