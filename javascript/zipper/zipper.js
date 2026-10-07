//
// This is only a SKELETON file for the 'Zipper' exercise. It's been provided as a
// convenience to get you started writing code faster.
//

export class Zipper {
  constructor(tree, breadcrumbs = []) {
    this.tree = tree;
    this.breadcrumbs = breadcrumbs;
  }

  static fromTree(tree) {
    return tree ? new Zipper(JSON.parse(JSON.stringify(tree)), []) : null;
  }

  toTree() {
    let current = this;
    while (current.breadcrumbs.length > 0) {
      current = current.up();
    }
    return current.tree;
  }

  value() {
    return this.tree ? this.tree.value : null;
  }

  left() {
    if (!this.tree || !this.tree.left) return null;
    return new Zipper(this.tree.left, [
      { value: this.tree.value, right: this.tree.right, direction: 'left' },
      ...this.breadcrumbs,
    ]);
  }

  right() {
    if (!this.tree || !this.tree.right) return null;
    return new Zipper(this.tree.right, [
      { value: this.tree.value, left: this.tree.left, direction: 'right' },
      ...this.breadcrumbs,
    ]);
  }

  up() {
    if (this.breadcrumbs.length === 0) return null;
    const [parentContext, ...remainingBreadcrumbs] = this.breadcrumbs;

    const reconstructedTree = {
      value: parentContext.value,
      left: parentContext.direction === 'left' ? this.tree : parentContext.left,
      right: parentContext.direction === 'right' ? this.tree : parentContext.right,
    };

    return new Zipper(reconstructedTree, remainingBreadcrumbs);
  }

  setValue(value) {
    const updatedTree = { ...this.tree, value };
    return new Zipper(updatedTree, this.breadcrumbs);
  }

  setLeft(left) {
    const updatedTree = { ...this.tree, left };
    return new Zipper(updatedTree, this.breadcrumbs);
  }

  setRight(right) {
    const updatedTree = { ...this.tree, right };
    return new Zipper(updatedTree, this.breadcrumbs);
  }
}
