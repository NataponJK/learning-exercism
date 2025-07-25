using System.Collections.Generic;

public static class BottleSong
{
    public static IEnumerable<string> Recite(int startBottles, int takeDown)
    {
        var numberWords = new[] { "No", "One", "Two", "Three", "Four", "Five", "Six", "Seven", "Eight", "Nine", "Ten" };
        var bottleSong = new List<string>();
        for (var i = 0; i < takeDown; i++)
        {
            string beforeBottlesHanging = startBottles == 1 ? "bottle" : "bottles";
            string afterBottleHanging = startBottles == 2 ? "bottle" : "bottles";
            bottleSong.Add($"{numberWords[startBottles]} green {beforeBottlesHanging} hanging on the wall,");
            bottleSong.Add($"{numberWords[startBottles]} green {beforeBottlesHanging} hanging on the wall,");
            bottleSong.Add("And if one green bottle should accidentally fall,");
            bottleSong.Add($"There'll be {numberWords[startBottles - 1].ToLower()} green {afterBottleHanging} hanging on the wall.");
            startBottles--;
            if (i < takeDown - 1) bottleSong.Add("");
        }
        return bottleSong.ToArray();
    }
}
