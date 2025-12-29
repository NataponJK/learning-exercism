public class Matrix
{
    private readonly int[][] _matrix;
    public Matrix(string input)
    {
        _matrix = input
                    .Split('\n')
                    .Select(row => row.Split(' ')
                                    .Select(int.Parse)
                                    .ToArray())
                    .ToArray();
    }
    public int Rows => _matrix.Length;
    public int Cols => _matrix.FirstOrDefault()?.Length ?? 0;

    public int[] Row(int row)
    => _matrix[row - 1];
    public int[] Column(int col)
    => _matrix.Select(row => row[col - 1]).ToArray();
}