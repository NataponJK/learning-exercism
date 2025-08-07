public static class EliudsEggs
{
    public static int EggCount(int encodedCount)
    {
        string binaryString = Convert.ToString(encodedCount, 2);
        int count = 0;
        foreach (char bit in binaryString)
        {
            if (bit == '1')
            {
                count++;
            }
        }
        return count;
    }
}
