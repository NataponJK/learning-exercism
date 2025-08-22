public static class Bob
{
    public static string Response(string statement)
    {
        string trimmedStatement = statement.Trim();
        bool isEmpty = string.IsNullOrWhiteSpace(trimmedStatement);
        bool hasLetter = trimmedStatement.Any(char.IsLetter);
        bool isQuestion = trimmedStatement.EndsWith('?');
        bool isAllCaps = hasLetter && trimmedStatement.ToUpper() == trimmedStatement;

        return isEmpty
            ? "Fine. Be that way!"
            : isQuestion && isAllCaps
                ? "Calm down, I know what I'm doing!"
                : isAllCaps ? "Whoa, chill out!" : isQuestion ? "Sure." : "Whatever.";
    }

}