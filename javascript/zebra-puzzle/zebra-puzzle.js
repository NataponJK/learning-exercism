//
// This is only a SKELETON file for the 'Zebra Puzzle' exercise. It's been provided as a
// convenience to get you started writing code faster.
//
function* permute(input) {
  const permuteObj = (arr, m = []) => {
    if (arr.length === 0) {
      result.push(m);
    } else {
      for (let i = 0; i < arr.length; i++) {
        let curr = arr.slice();
        let next = curr.splice(i, 1);
        permuteObj(curr.slice(), m.concat(next));
      }
    }
  };
  const result = [];
  permuteObj(input);
  for (const p of result) yield p;
}

export class ZebraPuzzle {
  constructor() {
    this.solved = this.evaluate();
  }

  waterDrinker() {
    return this.solved.water;
  }

  zebraOwner() {
    return this.solved.zebra;
  }

  evaluate() {
    const nations = ['Englishman', 'Spaniard', 'Ukrainian', 'Norwegian', 'Japanese'];
    const colors = ['red', 'green', 'ivory', 'yellow', 'blue'];
    const drinks = ['coffee', 'tea', 'milk', 'orange juice', 'water'];
    const smokes = ['Old Gold', 'Kools', 'Chesterfields', 'Lucky Strike', 'Parliament'];
    const pets = ['dog', 'snails', 'fox', 'horse', 'zebra'];
    
    for (const c of permute(colors)) {
      if (c.indexOf('green') !== c.indexOf('ivory') + 1) continue;

      for (const n of permute(nations)) {
        if (n[0] !== 'Norwegian') continue;
        if (c[n.indexOf('Englishman')] !== 'red') continue;
        if (Math.abs(n.indexOf('Norwegian') - c.indexOf('blue')) !== 1) continue;

        for (const d of permute(drinks)) {
          if (d[2] !== 'milk') continue;
          if (d[c.indexOf('green')] !== 'coffee') continue;
          if (d[n.indexOf('Ukrainian')] !== 'tea') continue;

          for (const s of permute(smokes)) {
            if (s[c.indexOf('yellow')] !== 'Kools') continue;
            if (s[n.indexOf('Japanese')] !== 'Parliament') continue;
            if (d[s.indexOf('Lucky Strike')] !== 'orange juice') continue;

            for (const p of permute(pets)) {
              if (p[n.indexOf('Spaniard')] !== 'dog') continue;
              if (p[s.indexOf('Old Gold')] !== 'snails') continue;
              if (Math.abs(s.indexOf('Chesterfields') - p.indexOf('fox')) !== 1) continue
              if (Math.abs(s.indexOf('Kools') - p.indexOf('horse')) !== 1 ) continue;

              return {
                water: n[d.indexOf('water')],
                zebra: n[p.indexOf('zebra')]
              }
            }
          }
        }
      }
    }
  }
}
