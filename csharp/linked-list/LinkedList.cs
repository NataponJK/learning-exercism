public class Deque<T>
{
    List<T> _list = new();
    public void Push(T value)
    {
        _list.Add(value);
    }

    public T Pop()
    {
        T value = _list.Last();
        _list.RemoveAt(_list.Count - 1);
        return value;
    }

    public void Unshift(T value)
    {
        _list.Insert(0, value);
    }

    public T Shift()
    {
        T value = _list[0];
        _list.RemoveAt(0);
        return value;
    }
}