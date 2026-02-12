using System.Collections.Immutable;

public class Authenticator(Identity admin)
{
    private class EyeColor
    {
        public string Blue = "blue";
        public string Green = "green";
        public string Brown = "brown";
        public string Hazel = "hazel";
        public string Grey = "grey";
    }
    public Identity Admin => admin;
    private readonly ImmutableDictionary<string, Identity> developers = new Dictionary<string, Identity>
    {
        ["Bertrand"] = new Identity
        {
            Email = "bert@ex.ism",
            EyeColor = "blue",
        },
        ["Anders"] = new Identity
        {
            Email = "anders@ex.ism",
            EyeColor = "brown",
        }
    }.ToImmutableDictionary();
    public ImmutableDictionary<string, Identity> GetDevelopers()
    => developers;
}

public struct Identity
{
    public string Email { get; set; }
    public string EyeColor { get; set; }
}
