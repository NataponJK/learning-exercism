public class WordSearch
{
    private readonly string[] _grid;
    private readonly int _rows;
    private readonly int _cols;

    public WordSearch(string grid)
    {
        this._grid = grid.Split('\n');
        this._rows = this._grid.Length;
        this._cols = this._rows > 0 ? this._grid[0].Length : 0;
    }
    public Dictionary<string, ((int, int), (int, int))?> Search(string[] wordsToSearchFor)
    {
        Dictionary<string, ((int, int), (int, int))?> foundWords = new();
        foreach (string word in wordsToSearchFor)
        {
            var found = false;
            for (int row = 0; row < _rows && !found; row++)
            {
                for (int col = 0; col < _cols && !found; col++)
                {
                    if (SearchAllDirection(word, row, col, out var start, out var end))
                    {
                        foundWords.Add(word, (start, end));
                        found = true;
                    }
                }
            }
            if (!found)
            {
                foundWords.Add(word, null);
            }
        }
        return foundWords;
    }
    private bool SearchAllDirection(string word, int row, int col, out (int, int) start, out (int, int) end)
    {
        int[] dx = [0, 1, 1, 1, 0, -1, -1, -1];
        int[] dy = [1, 1, 0, -1, -1, -1, 0, 1];
        start = (col + 1, row + 1);
        for (int dir = 0; dir < 8; dir++)
        {
            int x = col, y = row;
            int i;
            for (i = 0; i < word.Length; i++)
            {
                if (x < 0 || x >= _cols ||
                    y < 0 || y >= _rows ||
                    _grid[y][x] != word[i])
                {
                    break;
                }
                x += dx[dir];
                y += dy[dir];
            }
            if (i == word.Length)
            {
                end = (x - dx[dir] + 1, y - dy[dir] + 1);
                return true;
            }
        }
        end = (0, 0);
        return false;
        
    }
}