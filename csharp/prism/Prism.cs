public static class Prism
{
    public readonly record struct LaserInfo(double X, double Y, double Angle);

    public readonly record struct PrismInfo(int Id, double X, double Y, double Angle);

    public static int[] FindSequence(LaserInfo laser, PrismInfo[] prisms)
    {
        var visitedIds = new List<int>();
        double currentX = laser.X;
        double currentY = laser.Y;
        double currentAngle = NormalizeAngle(laser.Angle);

        int maxSteps = prisms.Length * 5;
        
        for (int step = 0; step < maxSteps; step++)
        {
            PrismInfo? nextPrism = GetClosestPrismInPath(currentX, currentY, currentAngle, prisms);
            if (nextPrism == null) break;
            var hit = nextPrism.Value;
            visitedIds.Add(hit.Id);

            currentX = hit.X;
            currentY = hit.Y;
            currentAngle = NormalizeAngle(currentAngle + hit.Angle);
        }
        return [.. visitedIds];
    }
    private static double NormalizeAngle(double angle)
    {
        angle %= 360;
        return angle < 0 ? angle + 360 : angle;
    }

    private static PrismInfo? GetClosestPrismInPath(double x, double y, double angle, PrismInfo[] prisms)
    {
        double radians = angle * Math.PI / 180.0;
        double dirX = Math.Cos(radians);
        double dirY = Math.Sin(radians);

        PrismInfo? closestPrism = null;
        double minDistanceSq = double.MaxValue;
        foreach (var prism in prisms) {
            double vecX = prism.X - x;
            double vecY = prism.Y - y;
            double distanceSq = vecX * vecX + vecY * vecY;
            if (distanceSq < 1e-9) continue;

            double distance = Math.Sqrt(distanceSq);
            double alignment = (vecX * dirX + vecY * dirY) / distance;
            if (alignment > 0.9999)
            {
                if (distanceSq < minDistanceSq)
                {
                    minDistanceSq = distanceSq;
                    closestPrism = prism;
                }
            }
        }
        return closestPrism;
    }
}
