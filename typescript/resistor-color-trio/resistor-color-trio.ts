const COLORS = [
  'black', 'brown', 'red', 'orange', 'yellow',
  'green', 'blue', 'violet', 'grey', 'white',
] as const;

type Color = typeof COLORS[number];

export function decodedResistorValue(colors: Color[]):string {
  const first = COLORS.indexOf(colors[0]);
  const second = COLORS.indexOf(colors[1]);
  const muliplier = COLORS.indexOf(colors[2]);

  let value = (first * 10 + second) * (10 ** muliplier);
  let unit = `ohms`;

  if (value >= 1_000_000_000) {
      value /= 1_000_000_000;
      unit = "gigaohms";
    } else if (value >= 1_000_000) {
      value /= 1_000_000;
      unit = "megaohms";
    } else if (value >= 1_000) {
      value /= 1_000;
      unit = "kiloohms";
    };

  return `${value} ${unit}`;
}
