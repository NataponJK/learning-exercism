public enum Direction
{
    North,
    East,
    South,
    West
}

public class RobotSimulator
{
    public RobotSimulator(Direction direction, int x, int y)
    {
        Direction = direction;
        X = x;
        Y = y;
    }

    public Direction Direction {get; private set;}
    public int X {get; private set;}

    public int Y {get; private set;}

    public void Move(string instructions)
    {
        foreach (char instruction in instructions)
        {
            switch (instruction)
            {
                case 'R' : TurnRight(); break;
                case 'L' : TurnLeft(); break;
                case 'A' : Advance(); break;
            }
        }
    }
    private void TurnRight()
    => Direction = (Direction)(((int)Direction + 1) % 4);
    private void TurnLeft()
    => Direction = (Direction)(((int)Direction + 3) % 4);

    private void Advance()
    {
        switch (Direction)
        {
            
            case Direction.North: Y++; break;
            case Direction.South: Y--; break;
            case Direction.East: X++; break;
            case Direction.West: X--; break;
        }
    }
}