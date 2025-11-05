public static class ResistorColorTrio
{
    public enum ResistorColor
    {
        Black = 0,
        Brown = 1,
        Red = 2,
        Orange = 3,
        Yellow = 4,
        Green = 5,
        Blue = 6,
        Violet = 7,
        Grey = 8,
        White = 9,
    }
    private static ulong GetResistorColorValue(string color)
    => (ulong)Enum.Parse<ResistorColor>(color, true);
    public static string Label(string[] colors)
    {
        if (colors.Length < 3) throw new ArgumentException("Not Trio Resistor");
        ulong value = GetResistorColorValue(colors[0]) * 10 + GetResistorColorValue(colors[1]);
        value *= (uint) Math.Pow(10, GetResistorColorValue(colors[2]));

        return value switch
        {
            > (ulong)1e9 => $"{value / (int)1e9} gigaohms",
            > (ulong)1e6 => $"{value / (int)1e6} megaohms",
            > (ulong)1e3 => $"{value / (int)1e3} kiloohms",
            _ => $"{value} ohms"
        };
    }
}
