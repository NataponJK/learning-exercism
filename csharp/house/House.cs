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
        var sb = new StringBuilder("This is ");
        if (i == 0) return sb.Append(_subjects[0]).ToString();

        sb.Append(_subjects[i]).Append(' ');
        for (int j = i; j >= 1; j--)
        {
            sb.Append(_verbs[j]);
            if (j == 1) sb.Append(_subjects[0]);
            else sb.Append(_subjects[j - 1]).Append(' ');
        }
        return sb.ToString();
    }
    public static string Recite(int verseNumber)
    => Recite(verseNumber, verseNumber);
    public static string Recite(int startVerse, int endVerse)
    {
        var sb = new StringBuilder();
        for (int i = startVerse; i <= endVerse; i++)
        {
            sb.Append(BuildVerse(i) + "\n");
        }
        sb.Length--;
        return sb.ToString();
    }
}