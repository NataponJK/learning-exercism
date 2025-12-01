public static class Sieve
{
    public static int[] Primes(int limit)
    {
        bool[] isPrime = new bool[limit + 1];
        for (int i = 0; i <= limit; i++) isPrime[i] = true;
        isPrime[0] = false;
        isPrime[1] = false;

        for (int p = 2; p * p <= limit; p++)
        {
            if (isPrime[p] == true)
            {
                for (int i = p * p; i <= limit; i += p) isPrime[i] = false;
            }
        }

        List<int> primes = [];
        for (int i = 2; i <= limit; i++)
        {
            if(isPrime[i]) primes.Add(i);
        }
        return [.. primes];
    }
}