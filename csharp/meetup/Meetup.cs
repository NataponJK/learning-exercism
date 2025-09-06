public enum Schedule
{
    Teenth,
    First,
    Second,
    Third,
    Fourth,
    Last
}

public class Meetup
{
    private int _month, _year;
    public Meetup(int month, int year)
    {
        this._month = month;
        this._year = year;
    }

    public DateTime Day(DayOfWeek dayOfWeek, Schedule schedule)
    {
        var day = new DateTime(_year, _month, schedule == Schedule.Teenth ? 13 :
                                                    schedule == Schedule.First ? 1 :
                                                    schedule == Schedule.Second ? 8 :
                                                    schedule == Schedule.Third ? 15 :
                                                    schedule == Schedule.Fourth ? 22 :
                                                    DateTime.DaysInMonth(_year, _month) - 6);
        return day.AddDays((dayOfWeek - day.DayOfWeek + 7) % 7);
        
    }
}