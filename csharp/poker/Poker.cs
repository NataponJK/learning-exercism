public static class Poker
{
    public static IEnumerable<string> BestHands(IEnumerable<string> hands)
    {
        var rankedHands = hands.Select(h => new Hand(h))
                              .OrderByDescending(h => h.Score)
                              .ToList();
        var bestScore = rankedHands.First().Score;
        return rankedHands.Where(h => h.Score.CompareTo(bestScore) == 0)
                          .Select(h => h.RawHand);
    }
}

public class Hand
{
    public string RawHand { get; }
    public List<int> CardValues { get; }
    public List<int> Suits { get; }
    public HandScore Score { get; }
    private static int GetValue(string v)
    => v switch
    {
        "A" => 14, "K" => 13, "Q" => 12, "J" => 11,
        _ => int.Parse(v)
    };
    public Hand(string hand)
    {
        RawHand = hand;
        var cards = hand.Split(' ');
        CardValues = cards.Select(c => GetValue(c[..^1])).OrderByDescending(v => v).ToList();
        Suits = cards.Select(c => (int)c[^1]).ToList();
        if (CardValues.SequenceEqual([14, 5, 4, 3, 2]))
        {
            CardValues = [5, 4, 3, 2, 1];
        }
        Score = CalculateScore();
    }
    private HandScore CalculateScore()
    {
        var groups = CardValues.GroupBy(v => v)
                               .OrderByDescending(g => g.Count())
                               .ThenByDescending(g => g.Key)
                               .ToList();
        bool isFlush = Suits.Distinct().Count() == 1;
        bool isStraight = CardValues.Distinct().Count() == 5 
                       && CardValues.Max() - CardValues.Min() == 4;
        int rank;
        if (isFlush && isStraight) rank = 8;
        else if (groups[0].Count() == 4) rank = 7;
        else if (groups[0].Count() == 3 && groups[1].Count() == 2) rank = 6;
        else if (isFlush) rank = 5;
        else if (isStraight) rank = 4;
        else if (groups[0].Count() == 3) rank = 3;
        else if (groups[0].Count() == 2 && groups[1].Count() == 2) rank = 2;
        else if (groups[0].Count() == 2) rank = 1;
        else rank = 0; 

        return new HandScore(rank, groups.Select(g => g.Key).ToList());
    }
}
public record HandScore(int Rank, List<int> TieBreakers) : IComparable<HandScore>
{
    public int CompareTo(HandScore other)
    {
        if (Rank != other.Rank) return Rank.CompareTo(other.Rank);
        for (int i = 0; i < TieBreakers.Count; i++)
        {
            if (TieBreakers[i] != other.TieBreakers[i])
            return TieBreakers[i].CompareTo(other.TieBreakers[i]); 
        }
        return 0;
    }
}