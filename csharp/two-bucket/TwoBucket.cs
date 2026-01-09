public enum Bucket
{
    One,
    Two
}

public class TwoBucketResult
{
    public int Moves { get; set; }
    public Bucket GoalBucket { get; set; }
    public int OtherBucket { get; set; }
}

public class TwoBucket
{
    private int _bucketOne { get; }
    private int _bucketTwo { get; }
    private Bucket _startBucket { get; }
    public TwoBucket(int bucketOne, int bucketTwo, Bucket startBucket)
    {
        _bucketOne = bucketOne;
        _bucketTwo = bucketTwo;
        _startBucket = startBucket;
    }

    public TwoBucketResult Measure(int goal)
    {
        if (goal <= 0) throw new ArgumentException();
        if (goal > Math.Max(_bucketOne, _bucketTwo)) throw new ArgumentException();
        //if goal is not achiveable due to gcd
        if (goal % Gcd(_bucketOne, _bucketTwo) != 0) throw new ArgumentException();

        //BFS over states (a, b) : a = amount in BucketOne, b = amount in BucketTwo
        var startState = _startBucket == Bucket.One ? (a: _bucketOne, b: 0) : (a: 0, b: _bucketTwo);
        var queue = new Queue<((int a, int b) state, int move)>();
        var visited = new HashSet<(int,int)>();
        queue.Enqueue((startState, 1));
        visited.Add(startState);

        while (queue.Count > 0)
        {
            var (state, mv) = queue.Dequeue();
            int a = state.a;
            int b = state.b;

            if (a == goal || b == goal)
            {
                return new TwoBucketResult
                {
                    Moves = mv,
                    GoalBucket = a == goal ? Bucket.One : Bucket.Two,
                    OtherBucket = a == goal ? b : a
                };
            }
            //Generate neighbor: fill A, fill B, Empty A, Empty B, Pour A>B, Pour B>A
            var neighbors = new List<(int, int)>
            {
                (_bucketOne, b), // fill A
                (a, _bucketTwo), // fill B
                (0, b), //Empty A
                (a, 0), //Empty B
                //Pour A > B
                (a - Math.Min(a, _bucketTwo - b), b + Math.Min(a, _bucketTwo - b)),
                //Pour B > A
                (a + Math.Min(b, _bucketOne - a), b - Math.Min(b, _bucketOne - a)),
            };

            foreach (var nb in neighbors)
            {
                //Initial starting bucket is empty, other bucket is full
                if (_startBucket == Bucket.One && nb.Item1 == 0 && nb.Item2 == _bucketTwo) continue;
                if (_startBucket == Bucket.Two && nb.Item2 == 0 && nb.Item1 == _bucketOne) continue;

                if (!visited.Contains(nb))
                {
                    visited.Add(nb);
                    queue.Enqueue((nb, mv + 1));
                }
            }
        }
        throw new ArgumentException();
    }
    //Great Common Diviser
    private static int Gcd(int a, int b)
    {
        while (b != 0)
        {
            int temp = b;
            b = a % b;
            a = temp;
        }
        return a;
    }
}
