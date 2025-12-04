public static class VariableLengthQuantity
{
    public static uint[] Encode(uint[] numbers)
    {
        IList<uint> ret = [];
        foreach(var n in numbers.Reverse())
        {
            var m = n;
            ret.Add(m & 0x7f);
            while ((m >>= 7) != 0)
            {
                ret.Add((m & 0x7f) | 0x80);
            }
        }
        return [..ret.Reverse()];
    }

    public static uint[] Decode(uint[] bytes)
    {
        IList<uint> ret = [];
        uint m = 0;
        foreach(var b in bytes)
        {
            m += b & 0x7f;
            if((b & 0x80) == 0)
            {
                ret.Add(m);
                m = 0;
            }
            else m <<= 7;
        }
        return ret.Count == 0 ? throw new InvalidOperationException() : [..ret];
    }
}