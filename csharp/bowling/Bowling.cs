public class BowlingGame
{   
    private int[,] _rolls = new int[12, 2];
	private int _frame = 0;
	private int _frameRoll = 0;
    private int _additionalRolls = 0;
    public void Roll(int pins) 
    {
        if(pins < 0 || pins > 10) throw new ArgumentException();
        if(_frame > 9)
        {
            if(IsSpare(9))
            {
                _additionalRolls++;
                if(_additionalRolls > 1) throw new ArgumentException();
            }
            else if(IsStrike(9))
            {
                _additionalRolls++;
                if(_additionalRolls > 2) throw new ArgumentException();
            }
            else throw new ArgumentException();
        }
		_rolls[_frame, _frameRoll] = pins;
		if(_frameRoll == 1 || pins == 10)
		{
            if(_rolls[_frame, 0] + _rolls[_frame, 1] > 10) throw new ArgumentException();
			_frame++;
			_frameRoll = 0;
		}
		else _frameRoll = 1;
    }
    public int? Score()
    {
        if(_frame < 10) throw new ArgumentException();
        if(IsSpare(9) && _additionalRolls != 1) throw new ArgumentException();
        if(IsStrike(9) && _additionalRolls != 2) throw new ArgumentException();
		var result = 0;
		for(var i = 0; i < 10; i++)
		{
			if(IsSpare(i)) result += _rolls[i + 1, 0];
			if(IsStrike(i)) result += StrikeAddition(i + 1);
			
			for(var j = 0; j < _rolls.GetLength(1); j++)
			{
				result += _rolls[i, j];
			}
		}
		return result;
    }
    private bool IsSpare(int frame)
    => _rolls[frame, 0] != 10 && _rolls[frame, 0] + _rolls[frame, 1] == 10;
    private bool IsStrike(int frame)
    => _rolls[frame, 0] == 10;
    private int StrikeAddition(int frame)
    {
        var result = _rolls[frame, 0];
        if(result == 10) result += _rolls[frame + 1, 0];
        else result += _rolls[frame, 1];
        return result;
    }
}