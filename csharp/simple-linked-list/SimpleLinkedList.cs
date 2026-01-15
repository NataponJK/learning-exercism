using System.Collections;

public class SimpleLinkedList<T> : IEnumerable<T>
{
    private class Node
    {
        public T Value {get;}
        public Node Next {get; set;}
        public Node(T value, Node next) => (Value, Next) = (value, next);
    }
    private Node head;
    public int Count {get; private set;}    
    public SimpleLinkedList() {}
    public SimpleLinkedList(IEnumerable<T> values)
    {
        foreach (var value in values) Push(value);
    }
    public void Push(T value)
    {
        head = new Node(value, head);
        Count++;
    }
    public T Pop()
    {
        if (head == null) throw new InvalidOperationException();
        var value = head.Value;
        head = head.Next;
        Count--;
        return value;
    }
    public IEnumerator<T> GetEnumerator()
    {
        var current = head;
        while (current != null)
        {
            yield return current.Value;
            current = current.Next;
        }
    }
    IEnumerator IEnumerable.GetEnumerator() => GetEnumerator();
}