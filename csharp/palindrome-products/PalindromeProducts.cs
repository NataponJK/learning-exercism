public static class PalindromeProducts
{
    public static (int, IEnumerable<(int,int)>) Largest(int minFactor, int maxFactor)
    {
        if (minFactor > maxFactor) throw new ArgumentException();
        int largest = -1;
        for (int i = maxFactor; i >= minFactor; i--)
        {
            for (int j = i; j >= minFactor; j--)
            {
                if (IsPalindrome((i * j).ToString()) && (i * j > largest)) largest = i * j; 
            }
        }
        return largest != -1 ? (largest, GetFactors(largest, minFactor, maxFactor)) : throw new ArgumentException();
    }
    public static (int, IEnumerable<(int,int)>) Smallest(int minFactor, int maxFactor)
    {
        if (minFactor > maxFactor) throw new ArgumentException();
        int smallest = int.MaxValue;
        for (int i = minFactor; i <= maxFactor; i++)
        {
            for (int j = minFactor; j <= i; j++)
            {
                if (IsPalindrome((i * j).ToString()) && (i * j < smallest)) smallest = i * j;
            }
        }
        return smallest != int.MaxValue ? (smallest, GetFactors(smallest, minFactor, maxFactor)) : throw new ArgumentException();
    }
    private static bool IsPalindrome(string input)
    {
        for (int i = 0; i < ((input.Length -1 )/2) + 1; i++)
        {
            if (input[i] != input[^(i + 1)]) return false;            
        }
        return true;
    }
    private static IEnumerable<(int,int)> GetFactors (int product, int min, int max)
    {
        for (int i = min; i <= max; i++)
        {
            if((product % i ==0) && (product / i >= min) && (product / i <= max))
            {
                max = (product / i) - 1;
                yield return (i , product / i);
            }
        }
    }
}