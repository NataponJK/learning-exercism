export class SplitSecondStopwatch {
  constructor() {
    this._state = 'ready';
    this._currentLapSeconds = 0;
    this._totalSeconds = 0;
    this._previousLaps = [];
  }
  parseTime(time) {
    if (typeof time === 'number') return time;
    const [hrs, mins, secs] = time.split(':').map(Number);
    return hrs * 3600 + mins * 60 + secs;
  }

  formatTime(seconds) {
    seconds = Math.floor(seconds);
    const hrs = String(Math.floor(seconds / 3600)).padStart(2, '0');
    const mins = String(Math.floor((seconds % 3600) / 60)).padStart(2, '0');
    const secs = String(seconds % 60).padStart(2, '0');
    return `${hrs}:${mins}:${secs}`;
  }

  get state() { return this._state; }
  get currentLap() { return this.formatTime(this._currentLapSeconds); }
  get total() { return this.formatTime(this._totalSeconds); }
  get previousLaps() { return this._previousLaps; }

  start() {
    if (this._state === 'running') {
      throw new Error('cannot start an already running stopwatch');
    }
    this._state = 'running';
  }

  stop() {
    if (this._state !== 'running') {
      throw new Error('cannot stop a stopwatch that is not running');
    }
    this._state = 'stopped';
  }

  lap() {
    if (this._state !== 'running') {
      throw new Error('cannot lap a stopwatch that is not running');
    }
    this._previousLaps.push(this.formatTime(this._currentLapSeconds));
    this._currentLapSeconds = 0;
  }

  reset() {
    if (this._state !== 'stopped') {
      throw new Error('cannot reset a stopwatch that is not stopped');
    }
    this._state = 'ready';
    this._totalSeconds = 0;
    this._currentLapSeconds = 0;
    this._previousLaps = [];
  }

  advanceTime(duration) {
    if(this._state !== 'running') return;
    const seconds = this.parseTime(duration);
    this._currentLapSeconds += seconds;
    this._totalSeconds += seconds;
  }
}
