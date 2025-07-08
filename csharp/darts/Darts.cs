public static class Darts
{
    public static int Score(double x, double y)
    {
        double radius = Math.Sqrt(x * x + y * y);
        if (radius <= 1.0) { return 10; }
        else if (radius <= 5.0) { return 5; }
        else if (radius <= 10.0) { return 1; }
        else { return 0; }
    }
}
