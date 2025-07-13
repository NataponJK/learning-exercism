public static class SquareRoot
{
    public static int Root(int number)
    {
        int root = 0;
        while ((root + 1) * (root + 1) <= number)
        { root++; }
        return root;
    }
}
