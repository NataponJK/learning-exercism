public static class RnaTranscription
{
    public static string ToRna(string strand)
    => new string([.. strand.Select(n => n switch
    {
        'G' => 'C',
        'C' => 'G',
        'T' => 'A',
        'A' => 'U',
        _ => throw new ArgumentException()
    })]);
}