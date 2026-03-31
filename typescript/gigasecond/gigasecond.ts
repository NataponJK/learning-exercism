const GIGASECOND_IN_MS = 1e12;

export class Gigasecond {
  private readonly startTime : Date;

  constructor (startTime: Date) {
    this.startTime = startTime;
  }
  public date() : Date {
    const startTimeMs = this.startTime.getTime()
    const FutureTimeMs = startTimeMs + GIGASECOND_IN_MS;
    return new Date(FutureTimeMs);
  }
}

// One-Liner version
// export const gigasecond = (inputDate: Date): Date => {
//   return new Date(inputDate.getTime() + GIGASECOND_IN_MS);
// }