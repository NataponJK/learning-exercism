public static class Forth
{
    public static string Evaluate(string[] instructions)
    {
        Dictionary<string, List<string>> userDefined = [];
        Stack<int> numbers = [];

        void Invoke(Func<int, int, int> action)
        {
            int b = numbers.Pop();
            int a = numbers.Pop();
            numbers.Push(action(a, b));
        }
        void Dup() => numbers.Push(numbers.Peek());
        void Drop() => numbers.Pop();
        void Swap()
        {
            int a = numbers.Pop();
            int b = numbers.Pop();
            numbers.Push(a);
            numbers.Push(b);
        }
        void Over()
        {
            int a = numbers.Pop();
            int b = numbers.Peek();
            numbers.Push(a);
            numbers.Push(b);
        }
        
        foreach (var instruction in instructions.Select(i => i.ToLower()))
        {
            bool nextInstruction = false;
            Queue<string> parts = new (instruction.Split(" "));
            while (parts.TryDequeue(out var word))
            {
                if (nextInstruction) break;
                Action action = word switch
                {
                    _ when userDefined.ContainsKey(word) 
                    => () => userDefined[word].ForEach(w => parts.Enqueue(w)),
                    "+" => () => Invoke((a,b) => a + b),
                    "-" => () => Invoke((a,b) => a - b),
                    "*" => () => Invoke((a,b) => a * b),
                    "/" => () => Invoke((a,b) => a / b),
                    "dup" => () => Dup(),
                    "drop" => () => Drop(),
                    "swap" => () => Swap(),
                    "over" => () => Over(),
                    ":" => () => userDefined.Add(parts, out nextInstruction),
                    _ when int.TryParse(word, out var n) => () => numbers.Push(n),
                    _ => () => throw new InvalidOperationException(),
                };
                action();
            }
        }
        return string.Join(" ", numbers.Reverse());
    }

    static void Add(this Dictionary<string, List<string>> userDefined, Queue<string> parts, out bool next)
    {
        var key = parts.Dequeue();
        if (int.TryParse(key, out _)) throw new InvalidOperationException();

        next = true;
        bool rewrite = !userDefined.TryAdd(key, []);
        while (parts.TryDequeue(out var part))
        {
            if (part == ";") continue;
            if (userDefined.ContainsKey(part))
            {
                List<string> temp = userDefined[part];
                if (key == part) userDefined[key] = [];
                userDefined[key].AddRange(temp);
                rewrite = false;
            }
            else
            {
                if (rewrite)
                {
                    userDefined[key] = [];
                    rewrite = false;
                }
                userDefined[key].Add(part);
            }
        }
    }
}