using System.Text.RegularExpressions;

public static class Wordy
{
    private static readonly Regex EquationRegex = new(
        @"^What is (?<left>-?\d+)(?<operations> (?<operand>plus|minus|multiplied by|divided by) (?<right>-?\d+))*\?$",
        RegexOptions.Compiled | RegexOptions.IgnoreCase);
    public static int Answer(string question)
    {
        Match match = EquationRegex.Match(question);

        if(!match.Success) throw new ArgumentException();

        int result = int.Parse(match.Groups["left"].Value);
        CaptureCollection operands = match.Groups["operand"].Captures;
        CaptureCollection rights = match.Groups["right"].Captures;

        for (int i = 0; i < operands.Count; i++)
        {
            string operation = operands[i].Value;
            int nextNumber = int.Parse(rights[i].Value);
            
            result = ApplyOperation(result, operation, nextNumber);
        }
        return result;
    }
    private static int ApplyOperation(int left, string operand, int right) 
    => operand.ToLower() switch
    {
        "plus" => left + right,
        "minus" => left - right,
        "multiplied by" => left * right,
        "divided by" => left / right,
        _ => throw new ArgumentException(),
    };

}