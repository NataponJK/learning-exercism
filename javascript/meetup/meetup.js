//
// This is only a SKELETON file for the 'Meetup' exercise. It's been provided as a
// convenience to get you started writing code faster.
//
const WEEKDAYS = [
  'Sunday',
  'Monday',
  'Tuesday',
  'Wednesday',
  'Thursday',
  'Friday',
  'Saturday'
];

export const meetup = (year, month, descriptor, weekday) => {
  const targetDayIndex = WEEKDAYS.indexOf(weekday);
  const candidates = [];

  const jsMonth = month - 1;
  const totalDays = new Date(year, month, 0).getDate();

  for (let day = 1; day <= totalDays; day++) {
    const date = new Date(year, jsMonth, day);
    if (date.getDay() === targetDayIndex) {
      candidates.push(day);
    }
  }

  let chosenDay;
  switch (descriptor) {
    case 'first'  : chosenDay = candidates[0]; break;
    case 'second' : chosenDay = candidates[1]; break;
    case 'third'  : chosenDay = candidates[2]; break;
    case 'fourth' : chosenDay = candidates[3]; break;
    case 'fifth'  : chosenDay = candidates[4]; break;
    case 'last'   : chosenDay = candidates[candidates.length - 1]; break;
    case 'teenth' : chosenDay = candidates.find(day => day >= 13 && day <= 19); break;
    default : throw new Error('Invalid descriptor');
  }
  return new Date(year, jsMonth, chosenDay);
};
