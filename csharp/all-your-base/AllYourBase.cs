public static class AllYourBase
{
    public static int[] Rebase(int inputBase, int[] inputDigits, int outputBase)
    {
        if (inputBase < 2 || outputBase < 2 || inputDigits.Any(n => n < 0 || n >= inputBase))
        throw new ArgumentException();
        if (inputDigits.Length == 0 || inputDigits.All(n => n ==0))
        return [0];

        IList<int> output = [];
        int sum = 0, k = 0;
        foreach(var n in inputDigits.Reverse())
            sum += n * (int)Math.Pow(inputBase, k++);
        while (sum != 0)
        {
            output.Add(sum % outputBase);
            sum /= outputBase;
        }
        return [.. output.Reverse()];
    }
}