public static class RealNumberExtension
{
    public static double Expreal(this int realNumber, RationalNumber r)
    => Math.Pow(realNumber, 1.0 * r.num / r.den);
}

public struct RationalNumber
{
    public int num;
    public int den;
    public RationalNumber(int numerator, int denominator)
    {
        if(denominator == 0) { throw new ArgumentException(); }
        else if (denominator < 0)
        {
            num = -numerator;
            den = -denominator;
        }
        else
        {
            num = numerator;
            den = denominator;
        }
    }

    public static RationalNumber operator +(RationalNumber r1, RationalNumber r2)
    {
        int numerator = r1.num * r2.den + r1.den * r2.num;
        int denominator = r1.den * r2.den;
        return denominator < 0 ? 
            new RationalNumber(-numerator, -denominator).Reduce() : 
            new RationalNumber(numerator, denominator).Reduce();
    }

    public static RationalNumber operator -(RationalNumber r1, RationalNumber r2)
    => ( r1 + new RationalNumber(-r2.num, r2.den)).Reduce();

    public static RationalNumber operator *(RationalNumber r1, RationalNumber r2)
    {
        int denominator = r1.den * r2.den;
        return denominator < 0 ?
            new RationalNumber(-r1.num * r2.num, -denominator).Reduce() :
            new RationalNumber(r1.num * r2.num, denominator).Reduce();
    }

    public static RationalNumber operator /(RationalNumber r1, RationalNumber r2)
    {
        int denominator = r1.den * r2.num;
        return denominator < 0 ?
            new RationalNumber(-r1.num * r2.den, -denominator).Reduce() :
            new RationalNumber(r1.num * r2.den, denominator).Reduce();
    }

    public RationalNumber Abs()
    => new RationalNumber(Math.Abs(num), den).Reduce();

    public RationalNumber Reduce()
    {
        int a = Math.Abs(num);
        int b = den;
        while (a != 0 && b != 0)
        {
            if (a > b) a %= b;
            else b %= a;
        }
        return new (num / (a | b), den / (a | b));
    }

    public RationalNumber Exprational(int power)
    {
        if (power == 0) { return new (1, 1); }
        else if ( power < 0)
        { 
            return new RationalNumber((int)Math.Pow(den, -power), 
                                    (int)Math.Pow(num, -power)).Reduce(); 
        }
        return new RationalNumber((int)Math.Pow(num, power),
                                (int)Math.Pow(den, power)).Reduce();
    }

    public double Expreal(int baseNumber)
    => Math.Pow(baseNumber, 1.0 * this.num / this.den);
    public static implicit operator RationalNumber(int x)
    => new (x ,1);
}