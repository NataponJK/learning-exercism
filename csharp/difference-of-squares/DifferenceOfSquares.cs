public static class DifferenceOfSquares
{
    public static int CalculateSquareOfSum(int max)
    {
        int sumOfMax = max * (max + 1) / 2;
        return sumOfMax * sumOfMax;
    }

    public static int CalculateSumOfSquares(int max)
    => max * (max + 1) * ((2 * max) + 1) / 6; 

    public static int CalculateDifferenceOfSquares(int max)
    => CalculateSquareOfSum(max) - CalculateSumOfSquares(max);
}