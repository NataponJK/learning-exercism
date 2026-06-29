type Card = 'J' | 'Q' | 'K' | 'A' | string;
type Player = 'A' | 'B';

interface GameResult {
  status: 'finished' | 'loop';
  cards: number;
  tricks: number;
}

const PAYMENTS: Record<string, number> = { J: 1, Q: 2, K: 3, A: 4 };

export const simulateGame = (playerA: Card[], playerB: Card[]): GameResult => {
  const a: Card[] = [...playerA];
  const b: Card[] = [...playerB];

  let cards = 0;
  let tricks = 0;
  let pile: Card[] = [];

  let current: Player = 'A';
  let challenge = 0;
  let challenger: Player | null = null;

  const encodeDeck = (deck: Card[]): string => 
    deck.map(card => (PAYMENTS[card] ? card : "N")).join("");

  const stateKey = (): string => `${encodeDeck(a)}|${encodeDeck(b)}`;

  const seen: Set<string> = new Set<string>();
  seen.add(stateKey());

  while (true) {
    const deck = current === "A" ? a : b;
    if (deck.length === 0) {
      tricks++;
      const winner = current === "A" ? b : a;
      winner.push(...pile);
      pile = [];
      return {
        status: "finished", 
        cards, 
        tricks,
      };
    }
    const card = deck.shift()!;
    pile.push(card);
    cards++;
    if (PAYMENTS[card]) {
      challenge = PAYMENTS[card];
      challenger = current;
      current = current === "A" ? "B" : "A";
      continue;
    }
    if (challenge > 0) {
      challenge--;
      if (challenge === 0) {
        tricks++;
        const winner = challenger === "A" ? a : b;
        winner.push(...pile);
        pile = [];
        current = challenger!;
        challenger = null;
        
        if (a.length === 0 || b.length === 0) {
          return {
            status: "finished",
            cards,
            tricks,
          };
        }
        const key = stateKey();
        if (seen.has(key)) {
          return {
            status: "loop",
            cards,
            tricks,
          };
        }
        seen.add(key);
      }
    } else {
      current = current === "A" ? "B" : "A";
    }
  }
}
