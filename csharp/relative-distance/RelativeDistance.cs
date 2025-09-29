public class RelativeDistance
{
    private readonly Dictionary<string, HashSet<string>> _adjecencyList;
    public RelativeDistance(Dictionary<string, string[]> familyTree)
    {
        _adjecencyList = BuildAdjacencyList(familyTree);
    }

    public int DegreeOfSeparation(string personA, string personB)
    {
        if (!_adjecencyList.ContainsKey(personA) || !_adjecencyList.ContainsKey(personB))
        {
            return -1;
        }
        if (personA == personB)
        {
            return 0;
        }
        var queue = new Queue<(string Person, int Distance)>();
        var visited = new HashSet<string>();
        queue.Enqueue((personA, 0));
        visited.Add(personA);

        while (queue.Count > 0)
        {
            var (currentPerson, currentDistance) = queue.Dequeue();
            if (currentPerson == personB)
            {
                return currentDistance;
            }
            if (_adjecencyList.ContainsKey(currentPerson))
            {
                foreach (var neighbor in _adjecencyList[currentPerson])
                {
                    if (!visited.Contains(neighbor))
                    {
                        visited.Add(neighbor);
                        queue.Enqueue((neighbor, currentDistance + 1));
                    }
                }
            }
        }
        return -1;
    }

    private static Dictionary<string, HashSet<string>> BuildAdjacencyList(Dictionary<string, string[]> familyTree)
    {
        var adj = new Dictionary<string, HashSet<string>>();
        void AddEdge(string u, string v)
        {
            if (!adj.ContainsKey(u)) adj[u] = new HashSet<string>();
            adj[u].Add(v);
        }
        foreach (var entry in familyTree)
        {
            string parent = entry.Key;
            string[] children = entry.Value;
            foreach (string child in children)
            {
                AddEdge(parent, child);
                AddEdge(child, parent);
            }
            for (int i = 0; i < children.Length; i++)
            {
                for (int j = i + 1; j < children.Length; j++)
                {
                    AddEdge(children[i], children[j]);
                    AddEdge(children[j], children[i]);
                }
            }
        }
        return adj;
    }
}