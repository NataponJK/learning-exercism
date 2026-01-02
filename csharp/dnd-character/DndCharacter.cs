public class DndCharacter
{
    public int Strength { get; }
    public int Dexterity { get; }
    public int Constitution { get; }
    public int Intelligence { get; }
    public int Wisdom { get; }
    public int Charisma { get; }
    public int Hitpoints { get; }
    private static readonly Random _random = new();
    private DndCharacter()
    {
        Strength = Ability();
        Dexterity = Ability();
        Constitution = Ability();
        Intelligence = Ability();
        Wisdom = Ability();
        Charisma = Ability();
        Hitpoints = 10 + Modifier(Constitution);
    }
    public static int Modifier(int score)
    => (int)Math.Floor((score - 10) / 2.0);

    public static int Ability() 
    => Enumerable.Range(0, 4)
                         .Select(_ => _random.Next(1, 7))
                         .OrderBy(score => score)
                         .Skip(1)
                         .Sum();
    
    public static DndCharacter Generate()
    => new();
}
