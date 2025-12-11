public static class NthPrime
{
    public static int Prime(int nth)
    {
        if (nth < 1) throw new ArgumentOutOfRangeException(nameof(nth), "The nth prime number must be positive integer(start from 1).");
        int count = 0;
        int num = 1;
        while (count  < nth)
        {
            num++;
            if (IsPrime(num)) count++;
        }
        return num;
    }
    private static bool IsPrime(int number)
    {
        if (number <= 1) return false;
        if (number <= 3) return true;
        if (number % 2 == 0 || number % 3 == 0) return false;
        for (int i = 5; i * i <= number; i += 6)
        {
            if (number % i == 0 || number % (i + 2) == 0) return false;
        }
        return true;
    }
}