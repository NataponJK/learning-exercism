public enum Allergen
{
    Eggs = 1,
    Peanuts = 2,
    Shellfish = 4,
    Strawberries = 8,
    Tomatoes = 16,
    Chocolate = 32,
    Pollen = 64,
    Cats = 128
}

public class Allergies
{
    private readonly int _score;
    public Allergies(int mask)
    => _score = mask;

    public bool IsAllergicTo(Allergen allergen)
    => (_score & (int)allergen) == (int)allergen;

    public Allergen[] List()
    {
        var allergies = new List<Allergen>();
        foreach (Allergen allergen in Enum.GetValues(typeof(Allergen)))
        {
            if (IsAllergicTo(allergen))
            {
                allergies.Add(allergen);
            }
        }
        return allergies.ToArray();
    }
}