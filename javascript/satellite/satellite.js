//
// This is only a SKELETON file for the 'Satellite' exercise. It's been provided as a
// convenience to get you started writing code faster.
//

export const treeFromTraversals = (preorder, inorder) => {
  if (preorder.length !== inorder.length) {
    throw new Error('traversals must have the same length');
  }

  const preorderSet = new Set(preorder);
  if (preorderSet.size !== preorder.length) {
    throw new Error('traversals must contain unique items');
  }

  for (const element of inorder) {
    if (!preorderSet.has(element)) {
      throw new Error('traversals must have the same elements');
    }
  }

  const buildTree = (preArr, inArr) => {
    if (preArr.length === 0) return {};

    const rootValue = preArr[0];

    const rootIndexInorder = inArr.indexOf(rootValue);

    const leftInorder = inArr.slice(0, rootIndexInorder);
    const rightInorder = inArr.slice(rootIndexInorder + 1);

    const leftPreorder = preArr.slice(1, 1 + leftInorder.length);
    const rightPreorder = preArr.slice(1 + leftInorder.length);

    return {
      value: rootValue,
      left: buildTree(leftPreorder, leftInorder),
      right: buildTree(rightPreorder, rightInorder),
    };
  };

  return buildTree(preorder, inorder);
};
