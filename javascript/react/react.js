//
// This is only a SKELETON file for the 'React' exercise. It's been provided as a
// convenience to get you started writing code faster.
//

export class InputCell {
  constructor(value) {
    this._value = value;
    this.descendants = new Set();
  }

  get value() {
    return this._value;
  }

  setValue(value) {
    if (this._value === value) return;
    this._value = value;
    
    const order = [];
    const visited = new Set();
    
    function depthFirstSearch(cell) {
      for (const dependent of cell.descendants) {
        if (!visited.has(dependent)) {
          visited.add(dependent);
          depthFirstSearch(dependent);
          order.push(dependent);
        }
      }
    }
    
    depthFirstSearch(this);
    order.reverse();

    const oldValues = new Map();
    for (const cell of order) {
      oldValues.set(cell, cell.value);
    }

    for (const cell of order) {
      cell.updateValue();
    }

    for (const cell of order) {
      if (cell.value !== oldValues.get(cell)) {
        cell.fireCallbacks();
      }
    }
  }
}

export class ComputeCell {
   constructor(inputCells, fn) {
    this.inputCells = inputCells;
    this.fn = fn;
    this.callbacks = new Set();
    this.descendants = new Set();
    
    for (const cell of this.inputCells) {
      cell.descendants.add(this);
    }
    
    this._value = this.fn(this.inputCells);
  }

  get value() {
    return this._value;
  }

  updateValue() {
    this._value = this.fn(this.inputCells);
  }

  addCallback(callback) {
    this.callbacks.add(callback);
  }

  removeCallback(callback) {
    this.callbacks.delete(callback);
  }

  fireCallbacks() {
    for (const callback of this.callbacks) {
      callback.expect(this);
    }
  }
}

export class CallbackCell {
  constructor(fn) {
    this.fn = fn;
    this.values = [];
  }

  expect(cell) {
    this.values.push(this.fn(cell));
  }
}
