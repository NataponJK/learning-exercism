public class GradeSchool
{
    private readonly Dictionary<string, int> _roster = [];
    public bool Add(string student, int grade)
    => _roster.TryAdd(student, grade);
    public IEnumerable<string> Roster()
    => _roster.OrderBy(s => s.Value).ThenBy(s => s.Key).Select(s => s.Key);
    public IEnumerable<string> Grade(int grade)
    => _roster.Where(s => s.Value == grade).OrderBy(s => s.Key).Select(s => s.Key);
}