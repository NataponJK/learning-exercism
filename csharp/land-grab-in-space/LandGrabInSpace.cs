
public struct Coord
{
    public Coord(ushort x, ushort y)
    {
        X = x;
        Y = y;
    }

    public ushort X { get; }
    public ushort Y { get; }
}

public struct Plot
{
    public Coord CoordA { get; }
    public Coord CoordB { get; }
    public Coord CoordC { get; }
    public Coord CoordD { get; }
    public Plot(Coord coordA, Coord coordB, Coord coordC, Coord coordD)
    {
        CoordA = coordA;
        CoordB = coordB;
        CoordC = coordC;
        CoordD = coordD;
    }
}
public class ClaimsHandler
{
    private readonly List<Plot> _claims = [];
    public void StakeClaim(Plot plot)
    => _claims.Add(plot);

    public bool IsClaimStaked(Plot plot)
    => _claims.Contains(plot);

    public bool IsLastClaim(Plot plot)
    => _claims.Count == 0 ? false : _claims[^1].Equals(plot);

    public Plot GetClaimWithLongestSide()
    { 
        if (_claims.Count == 0) throw new InvalidOperationException();
        return _claims.OrderByDescending(GetLongestSideLength).First();
    }
    private static double Distance(Coord p1, Coord p2)
    {
        var dx = p1.X - p2.X;
        var dy = p1.Y - p2.Y;
        return Math.Sqrt(dx * dx + dy * dy);
    }
    private static double GetLongestSideLength(Plot plot)
    {   return new[] 
        {  
            Distance(plot.CoordA, plot.CoordB),
            Distance(plot.CoordB, plot.CoordC),
            Distance(plot.CoordC, plot.CoordD),
            Distance(plot.CoordD, plot.CoordA),
        }.Max();
    }
}
