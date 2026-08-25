export default class CircularBuffer<T> {
  private buffer: T[];
  private capacity: number;

  constructor(capacity: number) {
    this.capacity = capacity;
    this.buffer = [];
  }

  write(value: T): void {
    if (this.buffer.length >= this.capacity) {
      throw new BufferFullError();
    }
    this.buffer.push(value);
  }

  read(): T {
    if (this.buffer.length === 0) {
      throw new BufferEmptyError();
    }
    return this.buffer.shift()!;
  }

  forceWrite(value: T): void {
    if (this.buffer.length >= this.capacity) {
      this.read();
    }
    this.write(value);
  }

  clear(): void {
    this.buffer = [];
  }
}

export class BufferFullError extends Error {
  constructor() {
    super('Buffer is full');
    this.name = 'BufferFullError';
  }
}

export class BufferEmptyError extends Error {
  constructor() {
    super('Buffer is empty');
    this.name = 'BufferEmptyError';
  }
}
