public record BinTree(int Value, BinTree? Left, BinTree? Right);
internal record Crumb(int Value, BinTree? Tree, bool IsLeft);
public class Zipper
{   
    private readonly BinTree _focus;
    private readonly List<Crumb> _path;
    private Zipper(BinTree focus, List<Crumb> path)
    {
        _focus = focus;
        _path = path;
    }
    public override bool Equals(object? obj) 
    => obj is Zipper other && Equals(_focus, other._focus) && _path.SequenceEqual(other._path);
    public override int GetHashCode() => HashCode.Combine(_focus, _path.Count);
    public int Value() => _focus.Value;
    public Zipper SetValue(int newValue)
    => new Zipper (_focus with { Value = newValue}, _path);
    public Zipper SetLeft(BinTree? binTree)
    => new Zipper (_focus with { Left = binTree}, _path);
    public Zipper SetRight(BinTree? binTree)
    => new Zipper (_focus with { Right = binTree}, _path);
    public Zipper? Left()
    {
        if (_focus.Left == null) return null;
        var newPath = new List<Crumb>(_path);
        newPath.Insert(0, new Crumb(_focus.Value, _focus.Right, true));
        return new Zipper(_focus.Left, newPath);
    }
    public Zipper? Right()
    {
        if (_focus.Right == null) return null;
        var newPath = new List<Crumb>(_path);
        newPath.Insert(0, new Crumb(_focus.Value, _focus.Left, false));
        return new Zipper(_focus.Right, newPath);
    }
    public Zipper? Up()
    {
        if (_path.Count == 0) return null;
        var crumb = _path[0];
        var restPath = _path.Skip(1).ToList();
        var newTree = crumb.IsLeft ?
                        new BinTree(crumb.Value, _focus, crumb.Tree) :
                        new BinTree(crumb.Value, crumb.Tree, _focus);
        return new Zipper(newTree, restPath);
    }
    public BinTree ToTree()
    {
        Zipper current = this;
        while (current.Up() != null) current = current.Up();
        return current._focus;
    }
    public static Zipper FromTree(BinTree tree)
    => new Zipper (tree, []);
}