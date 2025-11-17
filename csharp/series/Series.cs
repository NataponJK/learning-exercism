public static class Series
{
    public static string[] Slices(string numbers, int sliceLength)
    {
        if(sliceLength <= 0 || sliceLength > numbers.Length)
        {
            throw new ArgumentException();
        }
        List<string> result = [];
        for(int i = 0; i <= numbers.Length - sliceLength; i++)
        {
            result.Add(numbers.Substring(i, sliceLength));
        }
        return [.. result];
    }
}