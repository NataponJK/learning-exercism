public class Player
{
    public int RollDie()
    {
        var DiceNumber = new Random();
        return DiceNumber.Next(1, 18);
    }

    public double GenerateSpellStrength()
    {
        var SpellStrength = new Random();
        return SpellStrength.NextDouble() * 100;
    }
}
