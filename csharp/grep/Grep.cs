using System.Text;

public static class Grep
{
    public static string Match(string pattern, string flags, string[] files)
    {
        bool flagLineNumber = flags.Contains("-n");
        bool flagFilename = flags.Contains("-l");
        bool flagCaseInsensitive = flags.Contains("-i");
        bool flagInvert = flags.Contains("-v");
        bool flagWholeLine = flags.Contains("-x");
        
        List<string> matches = new List<string> { };
        string[][] filesLines = new string[files.Length][];

        for (int i = 0; i < files.Length; i++)
            filesLines[i] = (File.ReadAllText(files[i])).Split('\n');  
            //array that contain arrays of single lines, each row stand for one file

        for (int i = 0; i < files.Length; i++)
        {
            string filePrefix = (files.Length > 1) ? $"{files[i]}:" : "" ;
            for (int l = 0; l < filesLines[i].Length; l++)
            {
                string line = filesLines[i][l];
                string linePrefix = (flagLineNumber) ? $"{l + 1}:" : "";
    
                bool matchCondition = line.Contains(pattern);
                
                if (flagCaseInsensitive && !flagWholeLine)
                    matchCondition = line.Contains(pattern, StringComparison.InvariantCultureIgnoreCase);
                else if (!flagCaseInsensitive && flagWholeLine)
                    matchCondition = line == pattern;
                else if (flagCaseInsensitive && flagWholeLine)
                    matchCondition = line.Equals(pattern, StringComparison.CurrentCultureIgnoreCase);
                
                if (flagInvert)
                    matchCondition = !matchCondition;
                if (matchCondition && !flagFilename && line != String.Empty)
                    matches.Add($"{filePrefix}{linePrefix}{line}");
                else if(matchCondition && flagFilename)
                {
                    matches.Add(files[i]);
                    break;
                }
            }
        }            
        var resultBuild = new StringBuilder();
        resultBuild.AppendJoin("\n", matches);
        
        return resultBuild.ToString();
    }
}