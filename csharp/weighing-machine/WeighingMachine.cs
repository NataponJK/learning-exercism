class WeighingMachine
{
    private double _weight;
    public int Precision { get; private set; }
    public double TareAdjustment { get; set; } = 5.0;
    public WeighingMachine(int precision)
    => Precision = precision;
    public double Weight
    {
        get => _weight;
        set => _weight = value >= 0 ? value : throw new ArgumentOutOfRangeException(nameof(value));
    }
    public string DisplayWeight
    {
        get => $"{Math.Round(_weight - TareAdjustment, Precision).ToString($"F{Precision}")} kg";
    }
}
