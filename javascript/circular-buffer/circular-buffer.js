//
// This is only a SKELETON file for the 'Circular Buffer' exercise. It's been provided as a
// convenience to get you started writing code faster.
//

class CircularBuffer {
  constructor(capacity) {
    this.capacity = capacity;
    this.buffer = new Array(capacity);
    this.clear();
  }

  write(value) {
    if (this.size === this.capacity) {
      throw new BufferFullError();
    }
    this.buffer[this.writeIndex] = value;
    this.writeIndex = (this.writeIndex + 1) % this.capacity;
    this.size++;
  }

  read() {
    if (this.size === 0) {
      throw new BufferEmptyError();
    }
    const value = this.buffer[this.readIndex];
    this.buffer[this.readIndex] = null;
    this.readIndex = (this.readIndex + 1) % this.capacity;
    this.size--;
    return value;
  }

  forceWrite(value) {
    if (this.size === this.capacity) {
      this.read();
    }
    this.write(value);
  }

  clear() {
    this.readIndex = 0;
    this.writeIndex = 0;
    this.size = 0;
    this.buffer.fill(null);
  }
}

export default CircularBuffer;

export class BufferFullError extends Error {
  constructor() {
    super('Buffer is full');
  }
}

export class BufferEmptyError extends Error {
  constructor() {
    super('Buffer is empty');
  }
}
