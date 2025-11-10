using System.Text;

public static class TwelveDays
{
    private static readonly string[] Days =
    [
        "first", "second", "third", "fourth", "fifth", "sixth", "seventh", "eighth", "ninth", "tenth", "eleventh", "twelfth"
    ];
    private static readonly string[] Gifts =
    [
        "a Partridge in a Pear Tree.",
        "two Turtle Doves, and ",
        "three French Hens, ",
        "four Calling Birds, ",
        "five Gold Rings, ",
        "six Geese-a-Laying, ",
        "seven Swans-a-Swimming, ",
        "eight Maids-a-Milking, ",
        "nine Ladies Dancing, ",
        "ten Lords-a-Leaping, ",
        "eleven Pipers Piping, ",
        "twelve Drummers Drumming, "
    ];
    public static string Recite(int verseNumber)
    => Recite(verseNumber, verseNumber);

    public static string Recite(int startVerse, int endVerse)
    {
        var verses = new List<string>();
        for (int v = startVerse; v <= endVerse; v++)
        {
            var gifts = new StringBuilder();
            for (int i = v - 1; i >= 0; i--)
            {
                gifts.Append(Gifts[i]);
            }
            string verse = $"On the {Days[v - 1]} day of Christmas my true love gave to me: {gifts}";
            verses.Add(verse);
        }
        return string.Join("\n", verses);
    }
}