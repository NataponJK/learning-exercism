public enum Owner
{
    None,
    Black,
    White
}

public class GoCounting
{
   private readonly char[,] board;
    private readonly int height;
    private readonly int width;
    
    public GoCounting(string input)
    {
        var lines = input.Split('\n', StringSplitOptions.RemoveEmptyEntries);
        height = lines.Length;
        width = lines[0].Length;
        board = new char[width, height]; //Note: board[x, y] (column, row)
        for (int y = 0; y < height; y++)
        {
            for (int x = 0; x < width; x++)
            {
                board[x, y] = lines[y][x];
            }
        }
    }

    public Tuple<Owner, HashSet<(int, int)>> Territory((int, int) coord)
    {
        var (x, y) = coord;
        if (!InBounds(x, y))
            throw new ArgumentException("Out of bounds");
        if (board[x, y] != ' ')
            return Tuple.Create(Owner.None, new HashSet<(int, int)>());
        var visited = new HashSet<(int, int)>();
        var queue = new Queue<(int, int)>();
        var borders = new HashSet<char>();
        queue.Enqueue((x, y));
        visited.Add((x, y));
        while (queue.Count > 0)
        {
            var (cx, cy) = queue.Dequeue();
            foreach (var (nx, ny) in Neighbors(cx, cy))
            {
                if (!InBounds(nx, ny) || visited.Contains((nx, ny)))
                    continue;
                var cell = board[nx, ny];
                if (cell == ' ')
                {
                    visited.Add((nx, ny));
                    queue.Enqueue((nx, ny));
                }
                else if (cell == 'B' || cell == 'W')
                {
                    borders.Add(cell);
                }
            }
        }
        Owner owner = Owner.None;
        if (borders.Count == 1)
        {
            owner = borders.Contains('B') ? Owner.Black : Owner.White;
        }
        return Tuple.Create(owner, visited);
    }

    public Dictionary<Owner, HashSet<(int, int)>> Territories()
    {
        var result = new Dictionary<Owner, HashSet<(int, int)>>()
        {
            [Owner.Black] = [],
            [Owner.White] = [],
            [Owner.None] = []
        };
        var seen = new HashSet<(int, int)>();
        for (int x = 0; x < width; x++)
        {
            for (int y = 0; y < height; y++)
            {
                if (board[x, y] == ' ' && !seen.Contains((x, y)))
                {
                    var (owner, coords) = Territory((x, y));
                    foreach (var coord in coords)
                        seen.Add(coord);
                    result[owner].UnionWith(coords);
                }
            }
        }
        return result;
    }

    private bool InBounds(int x, int y)
    => x >= 0 && y >= 0 && x < width && y < height;
    private static IEnumerable<(int,int)> Neighbors(int x, int y)
    {
        yield return (x - 1, y);
        yield return (x + 1, y);
        yield return (x, y - 1);
        yield return (x, y + 1);
    }
}
