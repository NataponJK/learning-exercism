public static class ScrabbleScore
{
    public static int Score(string input)
    {
        int score = 0;
        char[] arrayWord = input.ToUpper().ToCharArray();

        char[] OnePointLetters = ['A', 'E', 'I', 'O', 'U', 'L', 'N', 'R', 'S', 'T'];
        char[] TwoPointLetters = ['D', 'G'];
        char[] ThreePointLetters = ['B', 'C', 'M', 'P'];
        char[] FourPointLetters = ['F', 'H', 'V', 'W', 'Y'];
        char[] FivePointLetters = ['K'];
        char[] EightPointLetters = ['J', 'X'];
        char[] TenPointLetters = ['Q', 'Z'];

        foreach (var letter in arrayWord)
        {
            if (OnePointLetters.Contains(letter))
            {
                score++;
            }
            else if (TwoPointLetters.Contains(letter))
            {
                score += 2;
            }
            else if (ThreePointLetters.Contains(letter))
            {
                score += 3;
            }
            else if (FourPointLetters.Contains(letter))
            {
                score += 4;
            }
            else if (FivePointLetters.Contains(letter))
            {
                score += 5;
            }
            else if (EightPointLetters.Contains(letter))
            {
                score += 8;
            }
            else if (TenPointLetters.Contains(letter))
            {
                score += 10;
            }
        }
        return score;
    }
}