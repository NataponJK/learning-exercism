export class SplitSecondStopwatch {
  private _state: 'ready' | 'running' | 'stopped';
  private _currentLapSeconds: number;
  private _totalSeconds: number;
  private _previousLaps: string[];

  constructor() {
    this._state = 'ready';
    this._currentLapSeconds = 0;
    this._totalSeconds = 0;
    this._previousLaps = [];
  }
  parseTime(time: number | string): number {
    if (typeof time === 'number') return time;
    const [hrs, mins, secs] = time.split(':').map(Number);
    return hrs * 3600 + mins * 60 + secs;
  }
  formatTime(seconds: number): string {
    seconds = Math.floor(seconds);
    const hrs = String(Math.floor(seconds / 3600)).padStart(2, '0');
    const mins = String(Math.floor((seconds % 3600) / 60)).padStart(2, '0');
    const secs = String(seconds % 60).padStart(2, '0');
    return `${hrs}:${mins}:${secs}`;
  }

  public get state(): 'ready' | 'running' | 'stopped' { return this._state; }
  public get currentLap(): string { return this.formatTime(this._currentLapSeconds); }
  public get total(): string { return this.formatTime(this._totalSeconds); }
  public get previousLaps(): string[] { return this._previousLaps; }

  public start(): void {
    if (this._state === 'running') {
      throw new Error('cannot start an already running stopwatch');
    }
    this._state = 'running';
  }

  public stop(): void {
    if (this._state !== 'running') {
      throw new Error('cannot stop a stopwatch that is not running');
    }
    this._state = 'stopped';
  }

  public lap(): void {
    if (this._state !== 'running') {
      throw new Error('cannot lap a stopwatch that is not running');
    }
    this._previousLaps.push(this.formatTime(this._currentLapSeconds));
    this._currentLapSeconds = 0;
  }

  public reset(): void {
    if (this._state !== 'stopped') {
      throw new Error('cannot reset a stopwatch that is not stopped');
    }
    this._state = 'ready';
    this._totalSeconds = 0;
    this._currentLapSeconds = 0;
    this._previousLaps = [];
  }

  public advanceTime(duration: number | string): void {
    if (this._state !== 'running') return;
    const seconds = this.parseTime(duration);
    this._currentLapSeconds += seconds;
    this._totalSeconds += seconds;
  }
}
