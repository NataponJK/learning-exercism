public static class Say
{
    public static string InEnglish(long number)
    {
        if (number < 0 || number > 999_999_999_999) throw new ArgumentOutOfRangeException();
        if (number == 0) return "zero";
        List<string> output = [];
        long tempNumber = number;
        for (int i = 0; tempNumber > 0; tempNumber /= (i % 2 == 0) ? 100 : 10, i++)
        {
            int section = (int)((i % 2 == 0) ? tempNumber % 100 : tempNumber % 10);
            if (section < 1) continue;
            if (i % 2 == 0 && i > 0)
            {
                string suffix = (i / 2) switch
                {
                    1 => "thousand",
                    2 => "million",
                    3 => "billion",
                    _ => throw new ArgumentException()
                };
                output.Insert(0, suffix);
            }
            if (section > 20)
            {
                string sectionString = GetNumberWord(section / 10 * 10);
                if (section % 10 > 0)
                {
                    sectionString += '-' + GetNumberWord(section % 10);
                }
                output.Insert(0, sectionString);
            }
            else
            {
                if(i % 2 != 0)
                {
                    output.Insert(0, "hundred");
                }
                output.Insert(0, GetNumberWord(section));
            }
        }
        return string.Join(' ', output);
    }
    private static string GetNumberWord(int number)
    => number switch
    {
        1 => "one", 2 => "two", 3 => "three", 4 => "four", 5 => "five", 6 => "six", 7 => "seven", 8 => "eight", 9 => "nine", 10 => "ten",
        11 => "eleven", 12 => "twelve", 13 => "thirteen", 14 => "fourteen", 15 => "fifteen", 16 => "sixteen", 17 => "seventeen", 18 => "eighteen", 19 => "nineteen", 20 => "twenty",
        30 => "thirty", 40 => "forty", 50 => "fifty", 60 => "sixty", 70 => "seventy", 80 => "eighty", 90 => "ninety", 100 => "hunred",
        _ => throw new ArgumentException()
    };
}