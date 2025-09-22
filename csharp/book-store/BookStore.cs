using System.Net.NetworkInformation;

public static class BookStore
{
    private static readonly Dictionary<int, decimal> discounts = new()
    {
        { 1, 1.0m },
        { 2, 0.95m },
        { 3, 0.90m },
        { 4, 0.80m },
        { 5, 0.75m },
    };

    private const decimal bookPrice = 8.0m;
    public static decimal Total(IEnumerable<int> books)
    {
        if (books == null || !books.Any())
        {
            return 0;
        }
        var counts = books.GroupBy(b => b)
                        .Select(g => g.Count())
                        .OrderByDescending(c => c)
                        .ToList();
        return FindMinimumPrice(counts);
    }

    private static decimal FindMinimumPrice(List<int> counts)
    {
        if (!counts.Any())
        {
            return 0;
        }
        decimal minPrice = decimal.MaxValue;

        for (int i = 5; i >= 1; i--)
        {
            var tempCounts = new List<int>(counts);
            if (CanFormSet(tempCounts, i))
            {
                var newCounts = FormSet(tempCounts, i);
                decimal price = (i * bookPrice * discounts[i]) + FindMinimumPrice(newCounts);
                if (price < minPrice)
                {
                    minPrice = price;
                }
            }
        }
        if (minPrice == decimal.MaxValue)
        {
            return counts.Sum() * bookPrice;
        }
        return minPrice;
    }

    private static bool CanFormSet(List<int> counts, int size)
    => counts.Count >= size;

    private static List<int> FormSet(List<int> counts, int size)
    {
        var newCounts = new List<int>();
        for (int i = 0; i < counts.Count; i++)
        {
            if (i < size)
            {
                if (counts[i] > 1)
                {
                    newCounts.Add(counts[i] - 1);
                }
            }
            else
            {
                newCounts.Add(counts[i]);
            }
        }
        return newCounts.OrderByDescending(c => c).ToList();
    }
}