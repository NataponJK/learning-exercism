public static class BinarySearch
{
    public static int Find(int[] input, int value)
    {
        Array.Sort(input);
        int low = 0;
        int high = input.Length - 1;
        while (low <= high)
        {
            int mid = low + (high - low) / 2;
            if (value == input[mid])
            {
                return mid;
            }
            else if (value < input[mid])
            {
                high = mid - 1;
            }
            else
            {
                low = mid + 1;
            }
        }
        return -1;
    }
}