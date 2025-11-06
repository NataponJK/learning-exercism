using System.Text;

public static class House
{
    private static readonly string[] _subjects =
    [
        "the house that Jack built.",
        "the malt",
        "the rat",
        "the cat",
        "the dog",
        "the cow with the crumpled horn",
        "the maiden all forlorn",
        "the man all tattered and torn",
        "the priest all shaven and shorn",
        "the rooster that crowed in the morn",
        "the farmer sowing his corn",
        "the horse and the hound and the horn"
    ];
    private static readonly string[] _verbs =
    [
        "",
        "that lay in ",
        "that ate ",
        "that killed ",
        "that worried ",
        "that tossed ",
        "that milked ",
        "that kissed ",
        "that married ",
        "that woke ",
        "that kept ",
        "that belonged to "
    ];
    private static string BuildVerse(int verseNumber)
    {
        int i = verseNumber - 1;

        if (i == 0) return $"This is {_subjects[0]}";
        string verse = $"This is {_subjects[i]} ";

        for (int j = i; j >= 1; j--)
        {
            if (j == 1) verse += $"{_verbs[j]}{_subjects[0]}";
            else verse += $"{_verbs[j]}{_subjects[j - 1]} ";
        }
        return verse;
    }
    public static string Recite(int verseNumber)
    => Recite(verseNumber, verseNumber);
    public static string Recite(int startVerse, int endVerse)
    => string.Join("\n", Enumerable
                        .Range(startVerse, endVerse - startVerse + 1)
                        .Select(i => BuildVerse(i)));
}