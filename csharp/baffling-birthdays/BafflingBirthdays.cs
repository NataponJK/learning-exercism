public static class BafflingBirthdays
{
    private static Random random = new();
    public static DateOnly[] RandomBirthdates(int numberOfBirthdays)
    {
        DateOnly[] birthdays = new DateOnly[numberOfBirthdays];
        for (int i = 0; i < numberOfBirthdays; i++)
        {
            int month = random.Next(1, 13);
            birthdays[i] = new(1, month, random.Next(1, DateTime.DaysInMonth(1, month) + 1));
        }
        return birthdays;
    }

    public static bool SharedBirthday(DateOnly[] birthdays)
    {
        return birthdays.Length != birthdays
            .Select(b => b.Year % 4 == 0 ? b.DayOfYear - 1 : b.DayOfYear)
            .Distinct()
            .Count();
    }

    public static double EstimatedProbabilityOfSharedBirthday(int numberOfBirthdays)
    {
        double probability = 1;
        for (int i = 0; i < numberOfBirthdays; i++)
        {
            probability = probability * (365 - i) / 365;
        }
        return (1 - probability) * 100;
    }
}
