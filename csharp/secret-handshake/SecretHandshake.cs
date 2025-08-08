public static class SecretHandshake
{
    public static string[] Commands(int commandValue)
    {
        var actions = new List<string>();
        if ((commandValue & 1) == 1)
            actions.Add("wink");
        if ((commandValue & 2) == 2)
            actions.Add("double blink");
        if ((commandValue & 4) == 4)
            actions.Add("close your eyes");
        if ((commandValue & 8) == 8)
            actions.Add("jump");
        if ((commandValue & 16) == 16)
            actions.Reverse();
        return actions.ToArray();
    }
}
