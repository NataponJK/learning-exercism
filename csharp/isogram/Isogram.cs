public static class Isogram
{
    public static bool IsIsogram(string word)
    {
        word = word.ToLower().Replace("-","").Replace(" ","");
        char[] arrWord = word.ToCharArray();
        Array.Sort(arrWord);
        for (int i = 0; i < word.Length - 1; i++)
        {
            if (arrWord[i] == arrWord[i + 1])
            {
                return false;
            }
        }
        return true;
    }
}
