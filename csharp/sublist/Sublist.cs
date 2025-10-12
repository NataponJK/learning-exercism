public enum SublistType
{
    Equal,
    Unequal,
    Superlist,
    Sublist
}

public static class Sublist
{
    public static SublistType Classify<T>(List<T> list1, List<T> list2)
        where T : IComparable
    {
        if (list1.SequenceEqual(list2)) return SublistType.Equal;
        if (IsSublistOf(list2, list1)) return SublistType.Superlist;
        if (IsSublistOf(list1, list2)) return SublistType.Sublist;
        return SublistType.Unequal;
    }

    private static bool IsSublistOf<T> (List<T> list1, List<T> list2)
    {
        if (list1.Count == 0) return true;
        for (int i = 0; i <= list2.Count - list1.Count; i++)
        {
            bool match = !list1.Where((t, j) => !Equals(list2[i + j], t)).Any();
            if (match) return true;
        }
        return false;
    }
}