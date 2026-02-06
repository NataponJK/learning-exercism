public readonly struct ComplexNumber
{
    private readonly double _real;
    private readonly double _imaginary;
    public ComplexNumber(double real, double imaginary)
    {
        _real = real;
        _imaginary = imaginary;
    }
    //This is for allow passing plain number (int/double) where ComplexNumber is expected
    public static implicit operator ComplexNumber(double value)
    => new ComplexNumber(value, 0);
    public double Real()
    => _real;

    public double Imaginary()
    => _imaginary;

    public ComplexNumber Add(ComplexNumber other)
    => new ComplexNumber(_real + other._real, _imaginary + other._imaginary);

    public ComplexNumber Sub(ComplexNumber other)
    => new ComplexNumber(_real - other._real, _imaginary - other._imaginary);

    public ComplexNumber Mul(ComplexNumber other)
    {
        double a = _real;
        double b = _imaginary;
        double c = other._real;
        double d = other._imaginary;
        return new ComplexNumber(a * c - b * d, a * d + b * c);
    }

    public ComplexNumber Div(ComplexNumber other)
    {
        double a = _real;
        double b = _imaginary;
        double c = other._real;
        double d = other._imaginary;
        double denom = c * c + d * d;
        return new ComplexNumber((a * c + b * d) / denom, (b * c - a * d) / denom);
    }

    public double Abs()
    => Math.Sqrt(Math.Pow(_real, 2) + Math.Pow(_imaginary, 2));

    public ComplexNumber Conjugate()
    => new ComplexNumber(_real, -_imaginary);
    
    public ComplexNumber Exp()
    {
        //Formula: e^(a + bi) = e^a * (cos(b) + i * sin(b))
        double expReal = Math.Exp(_real);
        return new ComplexNumber(expReal * Math.Cos(_imaginary), expReal * Math.Sin(_imaginary));
    }
}