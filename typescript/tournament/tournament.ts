type TeamStats = {
  MP: number;
  W: number;
  D: number;
  L: number;
  P: number;
}

type Outcome = 'win' | 'loss' | 'draw';

export class Tournament {
  // eslint-disable-next-line no-unused-vars
  public tally(input: string): string {
    const teams: Map<string, TeamStats> = new Map();

    if (input.trim() !== '') {
      const matches = input.split('\n');

      for (const match of matches) {
        const [teamA, teamB, outcome] = match.split(';') as [string, string, Outcome];

        this.ensureTeamExists(teams, teamA);
        this.ensureTeamExists(teams, teamB);

        this.updateStats(teams, teamA, teamB, outcome);
      }
    }
    return this.formatResults(teams);
  }

  private ensureTeamExists(teams: Map<string, TeamStats>, teamName: string): void {
    if (!teams.has(teamName)) {
      teams.set(teamName, { MP: 0, W: 0, D: 0, L: 0, P: 0 });
    }
  }

  private updateStats(teams: Map<string, TeamStats>, teamA: string, teamB: string, outcome: Outcome): void {
    const statsA = teams.get(teamA)!;
    const statsB = teams.get(teamB)!;

    statsA.MP += 1;
    statsB.MP += 1;

    switch (outcome) {
      case 'win':
        statsA.W += 1;
        statsA.P += 3;
        statsB.L += 1;
        break;
      case 'loss':
        statsB.W += 1;
        statsB.P += 3;
        statsA.L += 1;
        break;
      case 'draw':
        statsA.D += 1;
        statsA.P += 1;
        statsB.D += 1;
        statsB.P += 1;
        break;
    }
  }

  private formatResults(teams: Map<string, TeamStats>): string {
    const header = 'Team                           | MP |  W |  D |  L |  P';

    const sortedTeams = [...teams.entries()].sort((a, b) => {
      if (b[1].P !== a[1].P) {
        return b[1].P - a[1].P;
      }
      return a[0].localeCompare(b[0]);
    });

    const rows = sortedTeams.map(([name, stats]) => {
      const teamNameStr = name.padEnd(30, ' ');
      const mpStr = stats.MP.toString().padStart(2, ' ');
      const wStr = stats.W.toString().padStart(2, ' ');
      const dStr = stats.D.toString().padStart(2, ' ');
      const lStr = stats.L.toString().padStart(2, ' ');
      const pStr = stats.P.toString().padStart(2, ' ');

      return `${teamNameStr} | ${mpStr} | ${wStr} | ${dStr} | ${lStr} | ${pStr}`;
    });

    return [header, ...rows].join('\n');
  }
}
