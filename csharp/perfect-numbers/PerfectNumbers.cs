public enum Classification
{
    Perfect,
    Abundant,
    Deficient
}

public static class PerfectNumbers
{
    public static Classification Classify(int number)
    {
        if(number <= 0) throw new ArgumentOutOfRangeException(nameof(number), "Number must be positive.");
        List<int> properDivisor = [];
        for (int i = 1; i <= number / 2; i++)
        {
            if (number % i == 0) properDivisor.Add(i);
        }
        int aliquotSum = properDivisor.Sum();
        return aliquotSum == number ? Classification.Perfect : aliquotSum > number ? Classification.Abundant : Classification.Deficient;
    }
}
