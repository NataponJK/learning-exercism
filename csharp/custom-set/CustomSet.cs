public class CustomSet
{
    private readonly List<int> _data = [];
    public CustomSet(params int[] values)
    {
        foreach (var value in values) Add(value);
    }
    public CustomSet Add(int value)
    {
        if(!Contains(value)) _data.Add(value);
        return this;
    }
    public bool Empty()
    => _data.Count == 0;
    public bool Contains(int value)
    => _data.Contains(value);
    public bool Subset(CustomSet right)
    {
        foreach (int value in _data)
        if (!right.Contains(value)) return false;
        return true;
    }
    public bool Disjoint(CustomSet right)
    {
        foreach(int value in _data)
        if (right.Contains(value)) return false;
        return true;
    }
    public override bool Equals(object? obj)
    {
        if (obj == null) return false;
        if (obj.GetType() == typeof(CustomSet))
        {
            CustomSet? other = obj as CustomSet;
            if (other == null) return false;
            List<int> otherData = new(other._data);
            List<int> selfData = new(_data);
            if (selfData.Count() != otherData.Count()) return false;
            otherData.Sort();
            selfData.Sort();
            for (int i = 0; i < selfData.Count; i++)
            {
                if (otherData[i] != selfData[i]) return false;
            }
            return true;
        }
        return false;
    }
    public override int GetHashCode()
    => _data.GetHashCode();

    public CustomSet Intersection(CustomSet right)
    {
        CustomSet ret = new();
        foreach(int value in _data)
        if (right.Contains(value)) ret.Add(value);
        return ret;
    }

    public CustomSet Difference(CustomSet right)
    {
        CustomSet ret = new();
        foreach (int value in _data)
        if (!right.Contains(value)) ret.Add(value);
        return ret;
    }

    public CustomSet Union(CustomSet right)
    {
        CustomSet ret = new();
        foreach (int value in _data) ret.Add(value);
        foreach (int value in right._data) ret.Add(value);
        return ret;
    }
}