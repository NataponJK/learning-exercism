public static class ScrabbleScore
{
    public static int Score(string input)
    {
        int score = 0;
        string word = input.ToUpper();

        List<char> OnePointLetters = new List<char>() { 'A', 'E', 'I', 'O', 'U', 'L', 'N', 'R', 'S', 'T' };
        List<char> TwoPointLetters = new List<char>() { 'D', 'G' };
        List<char> ThreePointLetters = new List<char>() { 'B', 'C', 'M', 'P' };
        List<char> FourPointLetters = new List<char>() { 'F', 'H', 'V', 'W', 'Y' };
        List<char> FivePointLetters = new List<char>() { 'K' };
        List<char> EightPointLetters = new List<char>() { 'J', 'X' };
        List<char> TenPointLetters = new List<char>() { 'Q', 'Z' };

        for (int i = 0; i < word.Length; i++)
        {
            char letter = word[i];
            if (OnePointLetters.Contains(letter))
            {
                score = score + 1;
            }
            else if (TwoPointLetters.Contains(letter))
            {
                score = score + 2;
            }
            else if (ThreePointLetters.Contains(letter))
            {
                score = score + 3;
            }
            else if (FourPointLetters.Contains(letter))
            {
                score = score + 4;
            }
            else if (FivePointLetters.Contains(letter))
            {
                score = score + 5;
            }
            else if (EightPointLetters.Contains(letter))
            {
                score = score + 8;
            }
            else if (TenPointLetters.Contains(letter))
            {
                score = score + 10;
            }
        }
        return score;
    }
}