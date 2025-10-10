public enum Plant
{
    Violets = 'V',
    Radishes = 'R',
    Clover = 'C',
    Grass = 'G'
}

public class KindergartenGarden
{
    private readonly List<string> _students = ["Alice", "Bob", "Charlie", "David", "Eve", "Fred", "Ginny", "Harriet", "Ileana", "Joseph", "Kincaid", "Larry"];
    private readonly IReadOnlyList<string> _plantsDiagram;

    public KindergartenGarden(string diagram)
    => _plantsDiagram = diagram.Split('\n');
    public IEnumerable<Plant> Plants(string student)
    {
        int studentIndex = _students.IndexOf(student);
        if (studentIndex == -1)
        {
            throw new ArgumentException($"{student} does not exist");
        }
        int startingPos = studentIndex * 2;
        foreach(string row in _plantsDiagram)
        {
            yield return (Plant)row[startingPos];
            yield return (Plant)row[startingPos + 1];
        }

    }
}