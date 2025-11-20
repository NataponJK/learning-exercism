public static class Change
{
    public static int[] FindFewestCoins(int[] coins, int target)
    {
        if(target < 0) throw new ArgumentException();
        List<int> list = [];
        int[] dp = new int[target + 1];
        int[] coinList = new int[target + 1];
        dp[0] = 0;
        for (int i = 1; i <= target; i++)
        {
            dp[i] = int.MaxValue;
            coinList[i] = -1;
        }
        for (int i = 1; i <= target; i++)
        {
            foreach (var coin in coins)
            {
                if(i >= coin && dp[i - coin] != int.MaxValue)
                {
                    if(dp[i-coin] + 1 < dp[i])
                    {
                        dp[i] = dp[i - coin] + 1;
                        coinList[i] = coin;
                    }
                }
            }
        }
        if(coinList[target] == -1) throw new ArgumentException();
        int cur = target;
        while (cur > 0)
        {
            list.Add(coinList[cur]);
            cur -= coinList[cur];
        }
        return [.. list];
    }
}