using System.Text;
using System.Text.RegularExpressions;

public static class Markdown
{
    //Rename Wrap to WrapTag
    private static string WrapTag(string text, string tag)
    // => "<" + tag + ">" + text + "</" + tag + ">";
    => $"<{tag}>{text}</{tag}>";
    //IsTag not used
    // private static bool IsTag(string text, string tag) => text.StartsWith("<" + tag + ">");

    //Rename Parse to ParseDelimiter
    private static string ParseDelimiter(string markdown, string delimiter, string tag)
    => Regex.Replace(markdown, $"{delimiter}(.+){delimiter}", WrapTag("$1", tag));
    // {

    //     var pattern = delimiter + "(.+)" + delimiter;
    //     var replacement = "<" + tag + ">$1</" + tag + ">";
    //     return Regex.Replace(markdown, pattern, replacement);
    // }

    //Rename Parse__ (two '_') to ParseStrong
    private static string ParseStrong(string markdown)
    => ParseDelimiter(markdown, "__", "strong");

    //Rename Parse_ (one '_') to ParseEm
    private static string ParseEm(string markdown)
    => ParseDelimiter(markdown, "_", "em");

    private static string ParseText(string markdown, bool list)
    {
        var parsedText = ParseEm(ParseStrong((markdown)));
        return list ? parsedText : WrapTag(parsedText, "p");
        // if (list)
        // {
        //     return parsedText;
        // }
        // else
        // {
        //     return Wrap(parsedText, "p");
        // }
    }

    private static string? ParseHeader(string markdown, bool list, out bool inListAfter)
    {
        var count = 0;

        for (int i = 0; i < markdown.Length; i++)
        {
            if (markdown[i] == '#') count += 1;
            else break;
        }

        if (count is 0 or > 6)
        {
            inListAfter = list;
            return null;
        }

        // var headerTag = "h" + count;
        // var headerHtml = Wrap(markdown.Substring(count + 1), headerTag);
        var headerHtml = WrapTag(markdown[(count + 1)..], $"h{count}");

        // if (list)
        // {
        //     inListAfter = false;
        //     return "</ul>" + headerHtml;
        // }
        // else
        // {
        //     inListAfter = false;
        //     return headerHtml;
        // }
        inListAfter = false;
        return list ? $"</ul>{headerHtml}" : headerHtml;
    }

    private static string? ParseLineItem(string markdown, bool list, out bool inListAfter)
    {
        if (!markdown.StartsWith(value: "*"))
        {
            inListAfter = list;
            return null;
        }
        // {
        // var innerHtml = WrapTag(ParseText(markdown.Substring(2), true), "li");

        // if (list)
        // {
        //     inListAfter = true;
        //     return innerHtml;
        // }
        // else
        // {
        //     inListAfter = true;
        //     return "<ul>" + innerHtml;
        // }
        // }

        // inListAfter = list;
        // return null;
        var innerHtml = WrapTag(ParseText(markdown[2..], true), "li");
        
        inListAfter = true;
        return list ? innerHtml : $"<ul>{innerHtml}";
    }

    private static string ParseParagraph(string markdown, bool list, out bool inListAfter)
    {
        // if (!list)
        // {
        //     inListAfter = false;
        //     return ParseText(markdown, false);
        // }
        // else
        // {
        //     inListAfter = false;
        //     return "</ul>" + ParseText(markdown, false);
        // }
        var parseText = ParseText(markdown, false);
        inListAfter = false;
        return !list ? parseText : $"</ul>{parseText}";
    }

    private static string ParseLine(string markdown, bool list, out bool inListAfter)
    {
        var result = ParseHeader(markdown, list, out inListAfter);

        // if (result == null)
        // {
        //     result = ParseLineItem(markdown, list, out inListAfter);
        // }

        // if (result == null)
        // {
        //     result = ParseParagraph(markdown, list, out inListAfter);
        // }

        // if (result == null)
        // {
        //     throw new ArgumentException("Invalid markdown");
        // }
        result ??= ParseLineItem(markdown, list, out inListAfter)
               ?? ParseParagraph(markdown, list, out inListAfter);
        return result ?? throw new ArgumentException("Invalid markdown");
    }

    public static string Parse(string markdown)
    {
        var lines = markdown.Split('\n');
        // var result = "";
        StringBuilder result = new();
        var list = false;

        // for (int i = 0; i < lines.Length; i++)
        // {
        //     var lineResult = ParseLine(lines[i], list, out list);
        //     result += lineResult;
        // }

        // if (list)
        // {
        //     return result + "</ul>";
        // }
        // else
        // {
        //     return result;
        // }

        for (int i = 0; i < lines.Length; i++)
        {
            var lineResult = ParseLine(lines[i], list, out list);
            result.Append(lineResult);
        }
        return list ? $"{result.ToString()}</ul>" : result.ToString();
    }
}