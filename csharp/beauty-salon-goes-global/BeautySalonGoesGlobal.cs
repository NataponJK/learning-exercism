using System.Globalization;
using System.Net.NetworkInformation;
using System.Runtime.InteropServices;

public enum Location
{
    NewYork,
    London,
    Paris
}

public enum AlertLevel
{
    Early,
    Standard,
    Late
}

public static class Appointment
{
    public static DateTime ShowLocalTime(DateTime dtUtc)
    => dtUtc.ToLocalTime();

    private static string GetTimeZoneID(Location location)
    {
        var isWindows = RuntimeInformation.IsOSPlatform(OSPlatform.Windows);
        return location switch
        {
            Location.NewYork => isWindows ? "Eastern Standard Time" : "America/New_York",
            Location.London => isWindows ? "GMT Standard Time" : "Europe/London",
            _ => isWindows ? "W. Europe Standard Time" : "Europe/Paris",
        };
    }

    public static DateTime Schedule(string appointmentDateDescription, Location location)
    {
        var timeZoneID = GetTimeZoneID(location);
        var timeZoneInfo = TimeZoneInfo.FindSystemTimeZoneById(timeZoneID);
        var localDateTime = DateTime.Parse(appointmentDateDescription);
        return TimeZoneInfo.ConvertTimeToUtc(localDateTime, timeZoneInfo);
    }

    public static DateTime GetAlertTime(DateTime appointment, AlertLevel alertLevel)
    {
        return alertLevel switch
        {
            AlertLevel.Early => appointment.Subtract(TimeSpan.FromDays(1)),
            AlertLevel.Standard => appointment.Subtract(TimeSpan.FromHours(1).Add(TimeSpan.FromMinutes(45))),
            _ => appointment.Subtract(TimeSpan.FromMinutes(30)),
        };
    }

    public static bool HasDaylightSavingChanged(DateTime dt, Location location)
    {
        var timeZoneID = GetTimeZoneID(location);
        var timeZoneInfo = TimeZoneInfo.FindSystemTimeZoneById(timeZoneID);
        var isDaylightSavingNow = timeZoneInfo.IsDaylightSavingTime(dt);
        var wasDaylightSaving7DayAgo = timeZoneInfo.IsDaylightSavingTime(dt.Subtract(TimeSpan.FromDays(7)));
        return isDaylightSavingNow != wasDaylightSaving7DayAgo;
    }

    public static DateTime NormalizeDateTime(string dtStr, Location location)
    {
        var cultureInfo = location switch
        {
            Location.NewYork => new CultureInfo("en-US"),
            Location.London => new CultureInfo("en-GB"),
            _ => new CultureInfo("fr-FR")
        };
        return DateTime.TryParse(dtStr, cultureInfo, DateTimeStyles.None, out var result) ? result : DateTime.MinValue;
    }
}
