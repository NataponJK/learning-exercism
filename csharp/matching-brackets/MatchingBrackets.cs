public static class MatchingBrackets
{
    public static bool IsPaired(string input)
    {
        Stack<char> stack = new();
        foreach (char c in input)
        {
            if (c == '(' || c == '[' || c == '{')
            {
                stack.Push(c);
            }
            else if (c == ')' || c == ']' || c == '}')
            {
                if (stack.Count == 0) return false;
                char top = stack.Peek();
                if ((c == ')' && top != '(') ||
                    (c == ']' && top != '[') ||
                    (c == '}' && top != '{'))
                {
                    return false;
                }
                stack.Pop();
            }
        }
        return stack.Count == 0;
    }
}
