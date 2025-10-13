public enum State
{
    Win,
    Draw,
    Ongoing,
    Invalid
}

public class TicTacToe
{
    private string[] _rows;
    public TicTacToe(string[] rows)
    => this._rows = rows;

    public State State
    {
        get
        {
            int countX = _rows.Sum(r => r.Count(c => c == 'X'));
            int countO = _rows.Sum(r => r.Count(c => c == 'O'));

            bool xWin = CheckWin('X');
            bool oWin = CheckWin('O');
            bool ongoing = _rows.Any(r => r.Contains(' '));

            //Check invalid
            if (countO > countX || countX - countO > 1) return State.Invalid;
            if (xWin && oWin) return State.Invalid;
            if (xWin && countX != countO + 1) return State.Invalid;
            if (oWin && countX != countO) return State.Invalid;

            if (xWin || oWin) return State.Win;
            return ongoing ? State.Ongoing : State.Draw;
        }
    }

    private bool CheckWin(char c)
    {
        string line = new string(c, 3);

        //Check rows
        if (_rows.Any(r => r == line)) return true;
        //Check cols
        for (int i = 0; i < 3; i++)
        {
            if (_rows[0][i] == c && _rows[1][i] == c && _rows[2][i] == c) return true;
        }
        //Check diagonal
        return (_rows[0][0] == c && _rows[1][1] == c && _rows[2][2] == c) ||
               (_rows[0][2] == c && _rows[1][1] == c && _rows[2][0] == c);
    }
}
