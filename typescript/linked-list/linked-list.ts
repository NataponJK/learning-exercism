class Node<T> {
  public value: T;
  public next: Node<T> | null = null;
  public prev: Node<T> | null = null;

  constructor(value: T) {
    this.value = value;
  }
}

export class LinkedList<T> {
  private head: Node<T> | null = null;
  private tail: Node<T> | null = null;

  public push(value: T): void {
    const newNode = new Node(value);
    if (!this.head || !this.tail) {
      this.head = newNode;
      this.tail = newNode;
    } else {
      newNode.prev = this.tail;
      this.tail.next = newNode;
      this.tail = newNode;
    }
  }

  public pop(): T | null {
    if (!this.tail) return null;
    const removedValue = this.tail.value;
    if (this.head === this.tail) {
      this.head = null;
      this.tail = null;
    } else {
      this.tail = this.tail.prev!;
      this.tail.next = null;
    }
    return removedValue;
  }

  public shift(): T | null {
    if (!this.head) return null;
    const removedValue = this.head.value;
    if (this.head === this.tail) {
      this.head = null;
      this.tail = null;
    } else {
      this.head = this.head.next!;
      this.head.prev = null;
    }
    return removedValue;
  }

  public unshift(value: T): void {
    const newNode = new Node(value);
    if (!this.head || !this.tail) {
      this.head = newNode;
      this.tail = newNode;
    } else {
      newNode.next = this.head;
      this.head.prev = newNode;
      this.head = newNode;
    }
  }

  public delete(value: T): void {
    let current = this.head;
    while (current) {
      if (current.value === value) {
        if (current === this.head && current === this.tail) {
          this.head = null;
          this.tail = null;
        } else if (current === this.head) {
          this.head = this.head.next;
          if (this.head) this.head.prev = null;
        } else if (current === this.tail) {
          this.tail = this.tail.prev;
          if (this.tail) this.tail.next = null;
        } else {
          current.prev!.next = current.next;
          current.next!.prev = current.prev;
        }
        return;
      }
      current = current.next;
    }
  }

  public count(): number {
    let count = 0;
    let current = this.head;
    while (current) {
      count++;
      current = current.next;
    }
    return count;
  }
}
