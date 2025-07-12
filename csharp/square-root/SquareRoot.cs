public static class SquareRoot
{
    public static int Root(int number)
    {
        int x = 0;
        while ((x + 1) * (x + 1) <= number)
        { x++; }
        return x;
    }
}
