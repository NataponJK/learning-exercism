public struct CurrencyAmount
{
    private decimal amount;
    private string currency;

    public CurrencyAmount(decimal amount, string currency)
    => (this.amount, this.currency) = (amount, currency);

    public static bool operator ==(CurrencyAmount amountA, CurrencyAmount amountB)
    => (amountA.currency == amountB.currency) 
        ? (amountA.amount == amountB.amount) 
            : throw new ArgumentException();

    public static bool operator !=(CurrencyAmount amountA, CurrencyAmount amountB)
    => (amountA.currency == amountB.currency)
        ? (amountA.amount != amountB.amount)
            : throw new ArgumentException();    

    public static bool operator >(CurrencyAmount amountA, CurrencyAmount amountB)
    => (amountA.currency == amountB.currency)
        ? (amountA.amount > amountB.amount)
            : throw new ArgumentException();

    public static bool operator <(CurrencyAmount amountA, CurrencyAmount amountB)
    => (amountA.currency == amountB.currency)
        ? (amountA.amount < amountB.amount)
            : throw new ArgumentException(); 

    public static CurrencyAmount operator +(CurrencyAmount amountA, CurrencyAmount amountB)
    => (amountA.currency == amountB.currency)
        ? new CurrencyAmount(amountA.amount + amountB.amount, amountA.currency)
            : throw new ArgumentException();

    public static CurrencyAmount operator -(CurrencyAmount amountA, CurrencyAmount amountB)
    => (amountA.currency == amountB.currency)
        ? new CurrencyAmount(amountA.amount - amountB.amount, amountA.currency)
            : throw new ArgumentException();

    public static CurrencyAmount operator *(CurrencyAmount amountA, CurrencyAmount amountB)
    => (amountA.currency == amountB.currency)
        ? new CurrencyAmount(amountA.amount * amountB.amount, amountA.currency)
            : throw new ArgumentException();
    public static CurrencyAmount operator *(CurrencyAmount amountA, decimal multiplier)
    => new CurrencyAmount(amountA.amount * multiplier, amountA.currency);
    public static CurrencyAmount operator *(decimal multiplier, CurrencyAmount amountB)
    => new CurrencyAmount(multiplier * amountB.amount, amountB.currency);
    
    public static CurrencyAmount operator /(CurrencyAmount amountA, CurrencyAmount amountB)
    => (amountA.currency == amountB.currency)
        ? new CurrencyAmount(amountA.amount / amountB.amount, amountA.currency)
            : throw new ArgumentException();
    public static CurrencyAmount operator /(CurrencyAmount amountA, decimal divisor)
    => new CurrencyAmount(amountA.amount / divisor, amountA.currency);

    public static explicit operator double(CurrencyAmount amt)
    => (double)amt.amount;
    public static implicit operator decimal(CurrencyAmount amt)
    => amt.amount;
}
