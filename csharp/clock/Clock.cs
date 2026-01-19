public class Clock : IEquatable<Clock>
{
    private readonly int _totlaMinuites;
    private const int MinutesPerDay = 24 * 60;
    public Clock(int hours, int minutes)
    {
        var totalMins = hours * 60 + minutes;
        _totlaMinuites = (MinutesPerDay + (totalMins % MinutesPerDay)) % MinutesPerDay;
    }
    public Clock Add(int minutesToAdd)
    => new Clock(0, _totlaMinuites + minutesToAdd);
    public Clock Subtract(int minutesToSubtract)
    => new Clock(0, _totlaMinuites - minutesToSubtract);
    public override string ToString()
    => $"{_totlaMinuites / 60:D2}:{_totlaMinuites % 60:D2}";
    public override bool Equals(object? obj)
    => obj is Clock other && Equals(other);
    public bool Equals(Clock other)
    => _totlaMinuites == other._totlaMinuites;
    public override int GetHashCode()
    => _totlaMinuites;
}
