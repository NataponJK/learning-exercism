public static class Knapsack
{
    public static int MaximumValue(int maximumWeight, (int weight, int value)[] items)
    {
        int numItems = items.Length;
        int[,] dp = new int[numItems + 1, maximumWeight + 1];
        for (int i = 1; i <= numItems; i++)
        {
            var currentItem = items[i - 1];
            for (int w = 1; w <= maximumWeight; w++)
            {
                if (currentItem.weight > w)
                {
                    dp[i, w] = dp[i - 1, w];
                }
                else
                {
                    dp[i, w] = Math.Max(dp[i - 1, w], currentItem.value + dp[i - 1, w - currentItem.weight]);
                }
            }
        }
        return dp[numItems, maximumWeight];
    }
}
