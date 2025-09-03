public static class PascalsTriangle
{
    public static IEnumerable<IEnumerable<int>> Calculate(int rows)
    {
        List<List<int>> triangle = new List<List<int>>();
        for (int i = 0; i < rows; i++)
        {
            List<int> numbers = new();
            for (int j = 0; j <= i; j++)
            {
                if (j == 0 || j == i)
                {
                    numbers.Add(1);
                }
                else
                {
                    numbers.Add(triangle[i - 1][j - 1] + triangle[i - 1][j]);
                }
            }
            triangle.Add(numbers);
        }
        return triangle;
    }

}