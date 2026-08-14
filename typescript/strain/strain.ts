type Predicate<T> = (element: T) => boolean;

export function keep<T>(collection: T[], predicate: Predicate<T>): T[] {
  const result: T[] = [];

  for (const element of collection) {
    if (predicate(element)) {
      result.push(element);
    }
  }
  return result;
}

export function discard<T>(collection: T[], predicate: Predicate<T>): T[] {
  return keep(collection, (element) => !predicate(element));
}
