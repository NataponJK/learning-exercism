public class Tree
{
    public string Value { get; }
    public Tree Parent { get; set; }
    public Tree[] Children { get; }
    public Tree(string nodeValue, params Tree[] children)
    {
        Value = nodeValue;
        Children = children;
        foreach(var child in children) child.Parent = this;
    }
    public override bool Equals(object? obj) => Equals(obj as Tree);
    public override int GetHashCode() => Value.GetHashCode();
    public bool Equals(Tree comparisonNode) => comparisonNode != null && comparisonNode.Value == Value;
    private Tree ReOrient(Tree disallowed)
    => new Tree(Value, new[] { Parent?.ReOrient(this)}.Concat(Children)
                                                      .Where(b => b != null && b != disallowed).ToArray());
    public Tree AsRoot() => ReOrient(null);
}

public static class Pov
{
    public static Tree FromPov(Tree tree, string from)
    {
        var tracker = new Stack<Tree>([tree]);
        Tree cursor = null;
        while (tracker.TryPop(out cursor))
        {
            if (cursor.Value == from) return cursor.AsRoot();
            foreach (var subtree in cursor.Children) tracker.Push(subtree);
        }
        throw new ArgumentException();
    }

    public static IEnumerable<string> PathTo(string from, string to, Tree tree)
    {
        var stackFrame = new Stack<(string[], Tree)>();
        stackFrame.Push(([from], FromPov(tree, from)));
        while(stackFrame.Any())
        {
            var (walk, node) = stackFrame.Pop();
            if (walk[^1] == to) return walk;
            foreach(var leaf in node.Children)
                stackFrame.Push((walk.Append(leaf.Value).ToArray(), leaf));
        }
        throw new ArgumentException();
    }
}