//
// This is only a SKELETON file for the 'Tournament' exercise. It's been provided as a
// convenience to get you started writing code faster.
//
const HEADER = 'Team                           | MP |  W |  D |  L |  P';

export const tournamentTally = (input) => {
  if (!input) return HEADER;

  const teams = {};

  const getTeam = (name) => {
    if (!teams[name]) {
      teams[name] = { name, mp: 0, w: 0, d: 0, l: 0, p: 0 };
    }
    return teams[name];
  }

  input.split('\n').forEach((line) => {
    const [team1Name, team2Name, outcome] = line.split(';');

    const team1 = getTeam(team1Name);
    const team2 = getTeam(team2Name);

    team1.mp += 1;
    team2.mp += 1;

    if (outcome === 'win') {
      team1.w += 1;
      team1.p += 3;
      team2.l += 1;
    } else if (outcome === 'loss') {
      team2.w += 1;
      team2.p += 3;
      team1.l += 1;
    } else if (outcome === 'draw') {
      team1.d += 1;
      team1.p += 1;
      team2.d += 1;
      team2.p += 1;
    }
  });

  const sortedTeams = Object.values(teams).sort((a, b) => {
    if (a.p != b.p) {
      return b.p - a.p;
    }
    return a.name.localeCompare(b.name);
  });

  const formattedRows = sortedTeams.map((team) => {
    const name = team.name.padEnd(30, ' ');
    const mp = team.mp.toString().padStart(2, ' ');
    const w = team.w.toString().padStart(2, ' ');
    const d = team.d.toString().padStart(2, ' ');
    const l = team.l.toString().padStart(2, ' ');
    const p = team.p.toString().padStart(2, ' ');
    return `${name} | ${mp} | ${w} | ${d} | ${l} | ${p}`;
  });
  return [HEADER, ...formattedRows].join('\n');
};
