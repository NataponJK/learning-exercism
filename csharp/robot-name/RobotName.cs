public class Robot
{
    private static HashSet<string> _usedName = new();
    private string? _name;
    private static Random _random = new();
    public string Name
    {
        get
        {
            if (string.IsNullOrEmpty(_name))
            {
                _name = GenerateUniqueName();
            }
            return _name;
        }
    }
    private static string GenerateUniqueName()
    {
        string newName;
        do
        {
            char letter1 = (char)_random.Next('A', 'Z' + 1);
            char letter2 = (char)_random.Next('A', 'Z' + 1);
            int number = _random.Next(0, 1000);
            newName = $"{letter1}{letter2}{number:D3}";
        }
        while (_usedName.Contains(newName));
        _usedName.Add(newName);
        return newName;
    }
    public Robot()
    => _name = GenerateUniqueName();
    public void Reset()
    => _name = GenerateUniqueName();
}