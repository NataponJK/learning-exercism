public static class Alphametics
{
    public static IDictionary<char, int> Solve(string equation)
    {
        var terms = equation.Split("==", StringSplitOptions.TrimEntries);
        var addends = terms[0].Split('+', StringSplitOptions.TrimEntries);
        var result = terms[1];

        var words = addends.Concat([result]).ToList();
        var uniqueLetters = words.SelectMany(w => w).Distinct().ToList();

        if (uniqueLetters.Count > 10) throw new ArgumentException();

        var leadingLetters = words.Select(w => w[0]).ToHashSet();
        var solution = new Dictionary<char, int>();

        bool solutionPossible = SolveRecursive();
        return !solutionPossible ? throw new ArgumentException() : (IDictionary<char, int>)solution;

        bool SolveRecursive(int index = 0)
        {
            if (index == uniqueLetters.Count)
            {
                long sum = addends.Sum(word => ToNumber(word, solution));
                long resultNum = ToNumber(result, solution);
                return sum == resultNum;
            }
            char currentLetter = uniqueLetters[index];

            for (int i = 0; i <= 9; i++)
            {
                if(solution.ContainsValue(i)) continue;
                if(i == 0 && leadingLetters.Contains(currentLetter)) continue;

                solution[currentLetter] = i;
                if(SolveRecursive(index + 1)) return true;
                solution.Remove(currentLetter);
            }
            return false;
        }
    }

    private static long ToNumber(string word, Dictionary<char, int> mapping)
    {
        long number = 0;
        foreach(char c in word) number = number * 10 + mapping[c];
        return number;
    }
}