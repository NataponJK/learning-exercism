public class BankAccount
{
    private decimal _balance;
    private bool _isOpen;
    private readonly object _lock = new();
    public void Open()
    => _isOpen = _isOpen ? throw new InvalidOperationException() : true;
    public void Close()
    {
        _isOpen = !_isOpen ? throw new InvalidOperationException() : false;
        lock (_lock) _balance = 0;
    }

    public decimal Balance
    {
        get
        {
            if (!_isOpen) throw new InvalidOperationException();
            lock (_lock) return _balance;
        }
    }
    public void Deposit(decimal change)
    {
        if (!_isOpen) throw new InvalidOperationException();
        if (change <= 0) throw new InvalidOperationException();
        lock (_lock) _balance += change;
    }
    public void Withdraw(decimal change)
    {
        if (!_isOpen) throw new InvalidOperationException();
        if (change > _balance || change <= 0) throw new InvalidOperationException();
        lock (_lock) _balance -= change;
    }
}
