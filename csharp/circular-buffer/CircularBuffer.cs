public class CircularBuffer<T>
{
    private readonly Queue<T> _queue;
    public int Capacity {get; }
    public CircularBuffer(int capacity)
    {
        Capacity = capacity;
        _queue = new Queue<T>(capacity);
    }

    public T Read()
    => _queue.Count == 0 ? throw new InvalidOperationException("Buffer is empty.") : _queue.Dequeue();

    public void Write(T value)
    {
        if (_queue.Count == Capacity)
        {
            throw new InvalidOperationException("Buffer is full.");
        }
        _queue.Enqueue(value);
    }

    public void Overwrite(T value)
    {
        if(_queue.Count == Capacity)
        {
            _queue.Dequeue();
        }
        _queue.Enqueue(value);
    }

    public void Clear()
    {
        _queue.Clear();
    }
}