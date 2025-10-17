public enum Color { Red , Green , Ivory , Yellow , Blue }
public enum Nationality { Englishman , Spaniard , Ukrainian , Japanese , Norwegian }
public enum Pet { Dog , Snails , Fox , Horse , Zebra }
public enum Drink { Coffee , Tea , Milk , OrangeJuice , Water }
public enum Smoke { OldGold , Kools , Chesterfields , LuckyStrike , Parliaments }
public enum Hobby { Dancing, Reading, Football, Chess, Painting }

public class House
{
    public Color color { get; set; }
    public Nationality nationality { get; set; }
    public Pet pet { get; set; }
    public Drink drink { get; set; }
    public Smoke smoke { get; set; }
    public Hobby hobby { get; set; }
    public int position { get; set; }
}

public static class ZebraPuzzle
{
    private static readonly House[] _solution;
    static ZebraPuzzle()
    => _solution = SolvePuzzle();
    public static Nationality DrinksWater()
    => _solution.First(h => h.drink == Drink.Water).nationality;

    public static Nationality OwnsZebra()
    => _solution.First(h => h.pet == Pet.Zebra).nationality;
    private static House[] SolvePuzzle()
    {
        var colors = Enum.GetValues<Color>().Cast<Color>().ToList();
        var nationalities = Enum.GetValues<Nationality>().Cast<Nationality>().ToList();
        var pets = Enum.GetValues<Pet>().Cast<Pet>().ToList();
        var drinks = Enum.GetValues<Drink>().Cast<Drink>().ToList();
        var smokes = Enum.GetValues<Smoke>().Cast<Smoke>().ToList();
        var hobbies = Enum.GetValues<Hobby>().Cast<Hobby>().ToList();

        foreach (var c in colors.Permutations())
        foreach (var n in nationalities.Permutations())
            {
                //Rule 1: There are fives house (Index 0, 1, 2, 3, 4)
                //Rule 2: Englishman lives in Red House
                if (n.IndexOf(Nationality.Englishman) != c.IndexOf(Color.Red)) continue;
                //Rule 10: Norwegian lives in First House
                if (n[0] != Nationality.Norwegian) continue;
                //Rule 15: Norwegian lives next to Blue House 
                if (c[1] != Color.Blue) continue;

                foreach (var d in drinks.Permutations())
                {
                    //Rule 4: Person in Green House drinks Coffee
                    if (d.IndexOf(Drink.Coffee) != c.IndexOf(Color.Green)) continue;
                    //Rule 5: Ukrainian drinks Tea
                    if (d.IndexOf(Drink.Tea) != n.IndexOf(Nationality.Ukrainian)) continue;
                    //Rule 9: Person in middle house drinks Milk
                    if (d[2] != Drink.Milk) continue;

                    foreach (var s in smokes.Permutations())
                        foreach (var p in pets.Permutations())
                        {
                            //Rule 3: Spainiard owns Dog
                            if (n.IndexOf(Nationality.Spaniard) != p.IndexOf(Pet.Dog)) continue;
                            //Rule 5: Green House in the right of Ivory House
                            if (c.IndexOf(Color.Green) != c.IndexOf(Color.Ivory) + 1) continue;

                            foreach (var h in hobbies.Permutations())
                            {
                                //Rule 7: Snail owner likes to Dance 
                                if (p.IndexOf(Pet.Snails) != h.IndexOf(Hobby.Dancing)) continue;
                                //Rule 8: Person in Yellow House is a Painter
                                if (c.IndexOf(Color.Yellow) != h.IndexOf(Hobby.Painting)) continue;
                                //Rule 13: Person plays football drinks Orange Juice
                                if (h.IndexOf(Hobby.Football) != d.IndexOf(Drink.OrangeJuice)) continue;
                                //Rule 14: Japanese plays Chess
                                if (n.IndexOf(Nationality.Japanese) != h.IndexOf(Hobby.Chess)) continue;
                                //Rule 11: Person who likes to Read lives next to Person with Fox
                                if (Math.Abs(h.IndexOf(Hobby.Reading) - p.IndexOf(Pet.Fox)) != 1) continue;
                                //Rule 12: Painter house is next to house with Horse
                                if (Math.Abs(h.IndexOf(Hobby.Painting) - p.IndexOf(Pet.Horse)) != 1) continue;

                                var houses = new House[5];
                                for (int i = 0; i < 5; i++)
                                {
                                    houses[i] = new House
                                    {
                                        position = i + 1,
                                        color = c[i],
                                        nationality = n[i],
                                        pet = p[i],
                                        drink = d[i],
                                        smoke = s[i],
                                        hobby = h[i]
                                    };
                                }
                                return houses;
                            }
                        }
                }

            }
        throw new InvalidOperationException("Can not solve the puzzle");
    }
    public static IEnumerable<List<T>> Permutations<T> (this List<T> list)
    {
        if (list.Count == 1)
        {
            yield return list;
        }
        else
        {
            for(int i = 0; i < list.Count; i++)
            {
                var first = list[i];
                var remaining = new List<T>(list);
                remaining.RemoveAt(i);
                foreach (var p in remaining.Permutations())
                {
                    p.Insert(0, first);
                    yield return p;
                }
            }
        }
    }
}