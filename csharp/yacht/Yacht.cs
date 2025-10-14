public enum YachtCategory
{
    Ones = 1,
    Twos = 2,
    Threes = 3,
    Fours = 4,
    Fives = 5,
    Sixes = 6,
    FullHouse = 7,
    FourOfAKind = 8,
    LittleStraight = 9,
    BigStraight = 10,
    Choice = 11,
    Yacht = 12,
}

public static class YachtGame
{
    public static int Score(int[] dice, YachtCategory category)
    {
        var counts = new int[7];
        foreach (var die in dice) counts[die]++;

        switch (category)
        {
            case YachtCategory.Ones:
            case YachtCategory.Twos:
            case YachtCategory.Threes:
            case YachtCategory.Fours:
            case YachtCategory.Fives:
            case YachtCategory.Sixes:
                return (int)category * counts[(int)category];
            case YachtCategory.FullHouse:
                bool hasThree = false, hasTwo = false;
                int threeVal = 0, twoVal = 0;
                for (int i = 1; i <= 6; i++)
                {
                    if (counts[i] == 3) { hasThree = true; threeVal = i; }
                    if (counts[i] == 2) { hasTwo = true; twoVal = i; }
                }
                if (hasThree && hasTwo) return dice.Sum();
                return 0;

            case YachtCategory.FourOfAKind:
                for (int i = 1; i <= 6; i++)
                {
                    if (counts[i] >= 4) return i * 4;
                }
                return 0;
            case YachtCategory.LittleStraight:
                if (counts[1] == 1 && counts[2] == 1 && counts[3] == 1 && counts[4] == 1 && counts[5] == 1) return 30;
                return 0;
            case YachtCategory.BigStraight:
                if (counts[2] == 1 && counts[3] == 1 && counts[4] == 1 && counts[5] == 1 && counts[6] == 1) return 30;
                return 0;
            case YachtCategory.Choice: return dice.Sum();
            case YachtCategory.Yacht:
                for (int i = 1; i <= 6; i++)
                {
                    if (counts[i] == 5)
                    return 50;
                }
                return 0;
            default:
                return 0;
        }
    }
}

