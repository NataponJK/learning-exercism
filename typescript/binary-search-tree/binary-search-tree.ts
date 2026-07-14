export class BinarySearchTree {
  private _data: number
  private _left: BinarySearchTree | null = null
  private _right: BinarySearchTree | null = null

  constructor(data: number) {
    this._data = data
  }

  public get data(): number {
    return this._data
  }
  
  public get right(): BinarySearchTree | null {
    return this._right
  }

  public get left(): BinarySearchTree | null {
    return this._left
  }

  public insert(value: number): void {
    if (value <= this._data) {
      if (this._left) {
        this._left.insert(value)
      } else {
        this._left = new BinarySearchTree(value)
      }
    } else {
      if (this._right) {
        this._right.insert(value)
      } else {
        this._right = new BinarySearchTree(value)
      }
    }
  }

  public each(callback: (data: number) => void): void {
    if (this._left) {
      this._left.each(callback)
    }
    callback(this._data)
    if (this._right) {
      this._right.each(callback)
    }
  }
}
