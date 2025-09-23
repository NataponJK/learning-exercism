public static class KillerSudokuHelper
{
    public static IEnumerable<int[]> Combinations(int sum, int size, int[] exclude)
    {
        var result = new List<int[]>();
        var excludeSet = new HashSet<int>(exclude);

        void Backtrack(List<int> currentCombination, int startDigit, int currentSum)
        {
            if (currentCombination.Count == size && currentSum == sum)
            {
                result.Add(currentCombination.ToArray());
                return;
            }
            if (currentCombination.Count >= size || currentSum >= sum)
            {
                return;
            }
            for (int digit = startDigit; digit <= 9; digit++)
            {
                if (exclude.Contains(digit) || currentCombination.Contains(digit))
                {
                    continue;
                }
                currentCombination.Add(digit);
                Backtrack(currentCombination, digit + 1, currentSum + digit);
                currentCombination.RemoveAt(currentCombination.Count - 1);
            }
        }

        Backtrack(new List<int>(), 1, 0);
        return result.OrderBy(comb => string.Join("", comb));
    }
    
}
