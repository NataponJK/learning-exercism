public class Reactor
{
    public InputCell CreateInputCell(int value)
    => new InputCell(value);
    public ComputeCell CreateComputeCell(IEnumerable<Cell> producers, Func<int[], int> compute)
    => new ComputeCell(producers, compute);

}

public abstract class Cell
{
    public EventHandler<int>? Updated;
    public EventHandler<int>? Changed;
    public virtual int Value { get; set; }
}

public class InputCell : Cell
{
    public override int Value
    {
        get => base.Value;
        set
        {
            if (base.Value != value)
            {
                base.Value = value;
                Updated?.Invoke(this, value);
                Changed?.Invoke(this, value);
            }
        }
    }
    public InputCell(int value)
    => Value = value;

}

public class ComputeCell : Cell
{
    private readonly List<Cell> _producers;
    private readonly Func<int[], int> _function;
    private int _oldValue;

    public ComputeCell(IEnumerable<Cell> cells, Func<int[], int> function)
    {
        _producers = cells.ToList();
        _function = function;
        //Calculate initial value before Event
        Value = function(_producers.Select(c => c.Value).ToArray());
        _oldValue = Value;
        //Set up EventHandler foreach producers
        foreach (Cell c in _producers)
        {
            c.Updated += OnUpdate!;
            c.Changed += OnChange!;
        }
    }

    private void OnChange(object sender, int e)
    {
        OnUpdate(sender, e);
        if (_oldValue == Value)
        {
            return;
        }
        _oldValue = Value;
        Updated?.Invoke(this, _oldValue);
        Changed?.Invoke(this, _oldValue);
    }
    private void OnUpdate(object sender, int value)
    => Value = _function(_producers.Select(c => c.Value).ToArray());
}