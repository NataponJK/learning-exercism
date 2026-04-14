export function reverse(inputString: string): string {
  //QuickFix 'typeof Intl' by Type Assertion
  const segmenters = new (Intl as any).Segmenter(undefined, { granularity: `grapheme`});
  const segments = Array.from(segmenters.segment(inputString)) as any[];
  return segments.map((s) => s.segment).reverse().join(``);
}

//Interface Declaration
// declare namespace Intl {
//   class Segmenter {
//     constructor(locale?: string, option?: { granularity: `grapheme` | `word` | `sentence`});
//     segment(input: string): Iterable<{ segment: string; index: number; inputString: string}>;
//   }
// }

// export function reverseString(inputString: string): string {
//   const segmenter = new Intl.Segmenter(undefined, { granularity: `grapheme`});
//   return Array.from(segmenter.segment(inputString))
//               .map((s) => s.segment)
//               .reverse()
//               .join(``);
// }