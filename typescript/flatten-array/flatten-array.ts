export function flatten(array: unknown[]): unknown[] {
  return array.flat(Infinity)
              .filter((element) => element !== null && element !== undefined);
}
