//
// This is only a SKELETON file for the 'Clock' exercise. It's been provided as a
// convenience to get you started writing code faster.
//
const MINUTES_IN_A_DAY = 24 * 60 //Hour * Minutes

export class Clock {
  constructor(hour = 0, minute = 0) {
    const totalMinutes = hour * 60 + minute;
    //Modular arithmetic to handle negative value;
    this.totalMinutes = ((totalMinutes % MINUTES_IN_A_DAY) + MINUTES_IN_A_DAY) % MINUTES_IN_A_DAY
  }

  toString() {
    const hours = Math.floor(this.totalMinutes / 60);
    const minutes = this.totalMinutes % 60;

    const paddedHours = hours.toString().padStart(2, '0');
    const paddedMinutes = minutes.toString().padStart(2, '0');
    return `${paddedHours}:${paddedMinutes}`;
  }

  plus(minutes) {
    return new Clock(0, this.totalMinutes + minutes);
  }

  minus(minutes) {
    return new Clock(0, this.totalMinutes - minutes);
  }

  equals(otherClock) {
    return this.totalMinutes === otherClock.totalMinutes;
  }
}
