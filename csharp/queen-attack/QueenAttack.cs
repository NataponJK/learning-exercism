public class Queen
{
    public Queen(int row, int column)
    {
        Row = row;
        Column = column;
    }

    public int Row { get; }
    public int Column { get; }
}

public static class QueenAttack
{
    public static bool CanAttack(Queen white, Queen black)
    => white.Row == black.Row && white.Column == black.Column ? throw new ArgumentException()
            :   black.Row == white.Row ||
                black.Column == white.Column ||
                Math.Abs(black.Row - white.Row) == Math.Abs(black.Column - white.Column);

    public static Queen Create(int row, int column)
    => row is < 0 or > 7 ? throw new ArgumentOutOfRangeException(nameof(row))
        : column is < 0 or > 7 ? throw new ArgumentOutOfRangeException(nameof(column)) 
        : new Queen(row, column);
}