public static class CollatzConjecture
{
    public static int Steps(int number)
    {
        if (number < 1) throw new ArgumentOutOfRangeException(nameof(number), "Number must be positive integer.");
        if (number == 1) return 0;
        int step = 0;
        long currentNumber = number;//use long for potantial large intermediate value;
        while (currentNumber != 1)
        {
            if (currentNumber % 2 == 0) currentNumber /= 2;
            else { currentNumber = (currentNumber * 3) + 1 ;}
            step++;
        }
        return step;
    }
}