using System.Globalization;

public record LedgerEntry(DateTime Date, string Description, decimal ChangeInCents);
public static class Ledger
{
    public static LedgerEntry CreateEntry(string date, string description, int changeInCents)
    => new(DateTime.Parse(date, CultureInfo.InvariantCulture), description, changeInCents / 100.0m);

    private static CultureInfo CreateCulture(string currency, string locale)
    {
        if (currency != "USD" && currency != "EUR") throw new ArgumentException("Invalid currency");
        if (locale != "nl-NL" && locale != "en-US") throw new ArgumentException("Invalid locale");

        var symbol = currency == "USD" ? "$" : "€";
        var negativePattern = locale == "nl-NL" ? 12 : 0;
        var datePattern = locale == "nl-NL" ? "dd/MM/yyyy" : "MM/dd/yyyy";

        var culture = new CultureInfo(locale, false)
        {
            NumberFormat =
            {
                CurrencySymbol = symbol,
                CurrencyNegativePattern = negativePattern
            },
            DateTimeFormat =
            {
                ShortDatePattern = datePattern
            }
        };
        return culture;
        // string? curSymb = null;
        // int curNeg = 0;
        // string? datPat = null;

        // if (currency != "USD" && currency != "EUR")
        // {
        //     throw new ArgumentException("Invalid currency");
        // }
        // else
        // {
        //     if (loc != "nl-NL" && loc != "en-US")
        //     {
        //         throw new ArgumentException("Invalid currency");
        //     }

        //     if (cur == "USD")
        //     {
        //         if (loc == "en-US")
        //         {
        //             curSymb = "$";
        //             datPat = "MM/dd/yyyy";
        //         }
        //         else if (loc == "nl-NL")
        //         {
        //             curSymb = "$";
        //             curNeg = 12;
        //             datPat = "dd/MM/yyyy";
        //         }
        //     }

        //     if (cur == "EUR")
        //     {
        //         if (loc == "en-US")
        //         {
        //             curSymb = "€";
        //             datPat = "MM/dd/yyyy";
        //         }
        //         else if (loc == "nl-NL")
        //         {
        //             curSymb = "€";
        //             curNeg = 12;
        //             datPat = "dd/MM/yyyy";
        //         }
        //     }
        // }

        // var culture = new CultureInfo(loc, false);
        // culture.NumberFormat.CurrencySymbol = curSymb!;
        // culture.NumberFormat.CurrencyNegativePattern = curNeg;
        // culture.DateTimeFormat.ShortDatePattern = datPat!;
        // return culture;
    }

    private static string PrintHeader(string locale)
    => locale switch
    {
        "en-US" => "Date       | Description               | Change       ",
        "nl-NL" => "Datum      | Omschrijving              | Verandering  ",
        _ => throw new ArgumentException("Invalid locale")
    };
    // {
    //     if (loc == "en-US")
    //     {
    //         return "Date       | Description               | Change       ";
    //     }

    //     else
    //     {
    //         if (loc == "nl-NL")
    //         {
    //             return "Datum      | Omschrijving              | Verandering  ";
    //         }
    //         else
    //         {
    //             throw new ArgumentException("Invalid locale");
    //         }
    //     }
    // }

    private static string FormatDate(IFormatProvider culture, DateTime date)
    => date.ToString("d", culture);

    private static string FormatDescription(string description)
    => description.Length > 25 ? description[..22] + "..." : description;
    // {
    //     if (desc.Length > 25)
    //     {
    //         var trunc = desc.Substring(0, 22);
    //         trunc += "...";
    //         return trunc;
    //     }

    //     return desc;
    // }

    private static string FormatChange(IFormatProvider culture, decimal change)
    {
        var formatted = change.ToString("C", culture);
        return change < 0.0m ? (formatted.Contains('-') ? formatted + " " : formatted) : formatted + " ";
        // if (cgh < 0.0m)
        // {
        //     var change = cgh.ToString("C", culture);
        //     if (change.Contains("-"))
        //     {
        //         return change + " ";
        //     }

        //     return change;
        // }
        // else
        // {
        //     return cgh.ToString("C", culture) + " ";
        // }
    }

    private static string FormatEntry(IFormatProvider culture, LedgerEntry entry)
    {
        var date = FormatDate(culture, entry.Date);
        var description = FormatDescription(entry.Description);
        var change = FormatChange(culture, entry.ChangeInCents);
        return $"{date} | {string.Format("{0,-25}", description)} | {string.Format("{0,13}", change)}";
        // var formatted = "";
        // var date = Date(culture, entry.Date);
        // var description = Description(entry.Desc);
        // var change = Change(culture, entry.Chg);

        // formatted += date;
        // formatted += " | ";
        // formatted += string.Format("{0,-25}", description);
        // formatted += " | ";
        // formatted += string.Format("{0,13}", change);

        // return formatted;
    }

    private static IEnumerable<LedgerEntry> SortEntries(IEnumerable<LedgerEntry> entries)
    => [.. entries.OrderBy(e => e.ChangeInCents < 0 ? 0 : 1).ThenBy(x => x.Date + "@" + x.Description + "@" + x.ChangeInCents)];
    // {
        // var neg = entries.Where(e => e.Chg < 0).OrderBy(x => x.Date + "@" + x.Desc + "@" + x.Chg);
        // var post = entries.Where(e => e.Chg >= 0).OrderBy(x => x.Date + "@" + x.Desc + "@" + x.Chg);

        // var result = new List<LedgerEntry>();
        // result.AddRange(neg);
        // result.AddRange(post);

        // return result;
    // }

    public static string Format(string currency, string locale, LedgerEntry[] entries)
    {
        var culture = CreateCulture(currency, locale);
        var header = PrintHeader(locale);
        var formattedEntries = entries.Length > 0
                               ? SortEntries(entries)
                               .Select(e => FormatEntry(culture, e))
                               : [];
        return header + (formattedEntries.Any() ? "\n" + string.Join("\n", formattedEntries) : "");
        // var formatted = "";
        // formatted += PrintHead(locale);

        // var culture = CreateCulture(currency, locale);

        // if (entries.Length > 0)
        // {
        //     var entriesForOutput = sort(entries);

        //     for (var i = 0; i < entriesForOutput.Count(); i++)
        //     {
        //         formatted += "\n" + PrintEntry(culture, entriesForOutput.Skip(i).First());
        //     }
        // }

        // return formatted;
    }
}
