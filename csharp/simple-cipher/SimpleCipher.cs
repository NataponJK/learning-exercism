public class SimpleCipher
{
    public SimpleCipher()
    => Key = new string(Enumerable.Range(0, 100)
                .Select(_ => (char)('a' + new Random().Next(26))).ToArray());

    public SimpleCipher(string key)
    => Key = key;
    
    public string Key { get; }

    private static char Shift(char c, int shift)
    => (char)('a' + (c - 'a' + shift + 26) % 26);

    public string Encode(string plaintext)
    => new(plaintext.Select((c, i) => Shift(c, Key[i % Key.Length] - 'a')).ToArray());

    public string Decode(string ciphertext)
    => new(ciphertext.Select((c, i) => Shift(c, -(Key[i % Key.Length] - 'a'))).ToArray());
}