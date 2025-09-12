using System.Collections;

public static class FlattenArray
{
    public static IEnumerable Flatten(IEnumerable input)
    {
        if (input == null)
        {
            yield break;
        }
        foreach (var item in input)
        {
            if (item == null)
            {
                continue;
            }
            if (item is string)
            {
                yield return item;
            }
            else if (item is IEnumerable enumerableItem)
            {
                foreach (var subItem in Flatten(enumerableItem))
                {
                    yield return subItem;
                }
            }
            else
            {
                yield return item;
            }
        }

    }
}