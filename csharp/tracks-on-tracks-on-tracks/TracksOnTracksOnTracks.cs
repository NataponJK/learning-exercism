public static class Languages
{
    public static List<string> NewList()
    => new();
    public static List<string> GetExistingLanguages()
    => new() {"C#", "Clojure", "Elm"};

    public static List<string> AddLanguage(List<string> languages, string language)
    => new(languages) { language };
    public static int CountLanguages(List<string> languages)
    => languages.Count;
    public static bool HasLanguage(List<string> languages, string language)
    =>   languages.Contains(language);

    public static List<string> ReverseList(List<string> languages)
    => languages.Reverse<string>().ToList();
    public static bool IsExciting(List<string> languages)
    => languages.Count >= 1 && languages[0] == "C#" || (languages.Count >= 2 && languages[1] == "C#") && (languages.Count == 2 || languages.Count == 3);

    public static List<string> RemoveLanguage(List<string> languages, string language)
    {
        languages.Remove(language);
        return languages;
    }

    public static bool IsUnique(List<string> languages)
    => languages.Count == new HashSet<string>(languages).Count;
}
