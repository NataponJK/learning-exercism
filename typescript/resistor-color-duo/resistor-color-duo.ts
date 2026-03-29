
//for 'Color' Can use Map or Object and Array
//enum for typesafety

enum Color {
  black, brown, red, orange, yellow,
  green, blue, violet, grey, white,
}

export function decodedValue(colors: (keyof typeof Color)[]): number {
  return Color[colors[0]] * 10 + Color[colors[1]];
}
