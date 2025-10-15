public static class Dominoes
{
    public static bool CanChain(IEnumerable<(int, int)> dominoes)
    {
        if (!dominoes.Any()) return true;
        var chain = Connect(dominoes).ToArray();

        return chain.Length == 1 && chain[0].Item1 == chain[0].Item2;
    }

    private static IEnumerable<(int,int)> Connect(IEnumerable<(int,int)> dominoes)
    {
        if (dominoes.Count() == 1) return dominoes;

        var currentChain = dominoes;
        var firstDominoes = currentChain.First();

        var potentialMatches = currentChain.Skip(1).Where(d => d.Item1 == firstDominoes.Item2 || d.Item2 == firstDominoes.Item2);

        foreach (var match in potentialMatches)
        {
            var remainingDominoes = currentChain.Skip(1).ToList();
            remainingDominoes.Remove(match);

            var connectedDomino = (firstDominoes.Item1, firstDominoes.Item2 == match.Item1 ? match.Item2 : match.Item1);

            var resultChain = Connect(remainingDominoes.Prepend(connectedDomino));
            if (resultChain.Count() == 1) return resultChain;
        }
        return currentChain;
    }
}