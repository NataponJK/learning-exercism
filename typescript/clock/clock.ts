const MINUTES_IN_A_DAY = 24 * 60;

export class Clock {
  private totalMinutes: number;

  constructor(hour: number = 0, minute: number = 0) {
    const totalMinutes = hour * 60 + minute;
    this.totalMinutes = ((totalMinutes % MINUTES_IN_A_DAY) + MINUTES_IN_A_DAY) % MINUTES_IN_A_DAY;
  }

  public toString(): string {
    const hours = Math.floor(this.totalMinutes / 60);
    const minutes = this.totalMinutes % 60;

    const paddedHours = hours.toString().padStart(2, '0');
    const paddedMinutes = minutes.toString().padStart(2, '0');
    return `${paddedHours}:${paddedMinutes}`;
  }

  public plus(minutes: number): Clock {
    return new Clock(0, this.totalMinutes + minutes);
  }

  public minus(minutes: number): Clock {
    return new Clock(0, this.totalMinutes - minutes);
  }

  public equals(other: Clock): boolean {
    return this.totalMinutes === other.totalMinutes;  
  }
}
