using System.Text;

public static class ResistorColorDuo
{
    public static int Value(string[] colors)
    {
        Dictionary<string, int> colorsMap = new()
        {
            {"black", 0},
            {"brown", 1},
            {"red", 2},
            {"orange", 3},
            {"yellow", 4},
            {"green", 5},
            {"blue", 6},
            {"violet", 7},
            {"grey", 8},
            {"white", 9},
        };
        int firstNumber = colorsMap[colors[0].ToLower()];
        int secondNumber = colorsMap[colors[1].ToLower()];
        return (firstNumber * 10) + secondNumber;
    }
}
