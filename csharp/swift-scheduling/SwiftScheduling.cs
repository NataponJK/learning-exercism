public static class SwiftScheduling
{
    public static DateTime DeliveryDate(DateTime meetingStart, string description)
    {
        switch (description)
        {
            case "NOW":
                return meetingStart.AddHours(2);
            case "ASAP":
                return meetingStart.Hour < 13
                ? new DateTime(meetingStart.Year, meetingStart.Month, meetingStart.Day, 17, 0, 0)
                : new DateTime(meetingStart.Year, meetingStart.Month, meetingStart.Day + 1, 13, 0, 0);
            case "EOW":
                if (meetingStart.DayOfWeek is DayOfWeek.Monday or DayOfWeek.Tuesday or DayOfWeek.Wednesday)
                {
                    DateTime friday = meetingStart.AddDays(((int)DayOfWeek.Friday - (int)meetingStart.DayOfWeek + 7) % 7);
                    return new DateTime(friday.Year, friday.Month, friday.Day, 17, 0, 0);
                }
                DateTime sunday = meetingStart.AddDays(((int)DayOfWeek.Sunday - (int)meetingStart.DayOfWeek + 7) % 7);
                return new DateTime(sunday.Year, sunday.Month, sunday.Day, 20, 0, 0);
            
            case not null when description.EndsWith('M') && int.TryParse(description[..^1], out var m):
                int y = m > meetingStart.Month ? meetingStart.Year : meetingStart.Year + 1;
                var firstDay = new DateTime(y, m, 1, 8, 0, 0);
                while (firstDay.DayOfWeek is DayOfWeek.Saturday or DayOfWeek.Sunday) firstDay = firstDay.AddDays(1);
                return firstDay;

            case not null when description.StartsWith('Q') && int.TryParse(description[1..], out var q):
                int lastMonthOfQuater = q * 3;
                int year = meetingStart.Month <= lastMonthOfQuater ? meetingStart.Year : meetingStart.Year + 1;

                var lastDayOfQuater = new DateTime(year, lastMonthOfQuater, DateTime.DaysInMonth(year, lastMonthOfQuater));
                while (lastDayOfQuater.DayOfWeek is DayOfWeek.Saturday or DayOfWeek.Sunday)
                    lastDayOfQuater = lastDayOfQuater.AddDays(-1);

                return new DateTime(lastDayOfQuater.Year, lastDayOfQuater.Month, lastDayOfQuater.Day, 8, 0, 0);
        }
        return meetingStart;
    }
}
