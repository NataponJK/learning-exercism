public record Tree(char Value, Tree? Left, Tree? Right);

public static class Satellite
{
    public static Tree? TreeFromTraversals(char[] preOrder, char[] inOrder)
    {
        if (preOrder.Length != inOrder.Length)
        {
            throw new ArgumentException();
        }
        if (preOrder.Length != 0 && inOrder.Length != 0 && preOrder.Intersect(inOrder).Count() == 0)
        {
            throw new ArgumentException();
        }
        if (preOrder.ToHashSet().Count() != preOrder.Length)
        {
            throw new ArgumentException();
        }
        int preIndex = 0;
        return BuildTree(preOrder, inOrder, ref preIndex, 0 , preOrder.Length -1);
    }
    private static Tree? BuildTree(char[] preOrder, char[] inOrder, ref int preIndex, int left, int right)
    {
        if (left > right)
        {
            return null;
        }
        char rootValue = preOrder[preIndex++];
        int rootIndex = Array.IndexOf(inOrder, rootValue);

        var tree = new Tree(rootValue,  BuildTree(preOrder, inOrder, ref preIndex, left, rootIndex - 1),
                                        BuildTree(preOrder, inOrder, ref preIndex, rootIndex + 1, right));
        return tree;
    }
}
