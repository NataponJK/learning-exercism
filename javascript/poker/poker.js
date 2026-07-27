//
// This is only a SKELETON file for the 'Poker' exercise. It's been provided as a
// convenience to get you started writing code faster.
//

export const bestHands = (hands) => {
  if (hands.length <= 1) return hands;

  const scoredHands = hands.map(hand => ({
    original: hand,
    score: scoreHand(hand)
  }));

  let highestScore = scoredHands[0].score;
  for (let i = 1; i < scoredHands.length; i++) {
    if (compareScores(scoredHands[i].score, highestScore) > 0) {
      highestScore = scoredHands[i].score;
    }
  }
  
  return scoredHands
    .filter(h => compareScores(h.score, highestScore) === 0)
    .map(h => h.original);
};

const CARD_VALUES = {
  '2': 2, '3': 3, '4': 4, '5': 5, '6': 6, '7': 7, '8': 8, '9': 9, '10': 10,
  'J': 11, 'Q': 12, 'K': 13, 'A': 14
};

function scoreHand(handStr) {
  const cards = handStr.split(' ').map(c => {
    const valueStr = c.slice(0, -1);
    const suit = c.slice(-1);
    return { value: CARD_VALUES[valueStr], suit };
  })

  const suits = cards.map(c => c.suit);
  const isFlush = new Set(suits).size === 1;

  const counts = {};
  for (const c of cards) {
    counts[c.value] = (counts[c.value] || 0) + 1;
  }

  const groups = Object.entries(counts)
    .map(([val, count]) => ({ val: Number(val), count }))
    .sort((a, b) => b.count - a.count || b.val - a.val);

  const groupCounts = groups.map(g => g.count);
  const groupValues = groups.map(g => g.val);

  let isStraight = false;
  let straightValues = [];

  if (groupCounts.length === 5) {
    if (groupValues[0] - groupValues[4] === 4) {
      isStraight = true;
      straightValues = [...groupValues];
    } else if (
      groupValues[0] === 14 
      && groupValues[1] === 5 
      && groupValues[2] === 4 
      && groupValues[3] === 3 
      && groupValues[4] === 2
    ) {
      isStraight = true;
      straightValues = [5, 4, 3, 2, 1];
    }
  }

  let handTypeRank = 0;
  let tieBreakers = groupValues;
  
  if (isStraight && isFlush) {
    handTypeRank = 9;
    tieBreakers = straightValues;
  } else if (groupCounts[0] === 4) {
    handTypeRank = 8; // Four of a kind
  } else if (groupCounts[0] === 3 && groupCounts[1] === 2) {
    handTypeRank = 7; // Full House
  } else if (isFlush) {
    handTypeRank = 6;
  } else if (isStraight) {
    handTypeRank = 5;
    tieBreakers = straightValues;
  } else if (groupCounts[0] === 3) {
    handTypeRank = 4; // Three of a kind
  } else if (groupCounts[0] === 2 && groupCounts[1] === 2) {
    handTypeRank = 3; // Two Pair
  } else if (groupCounts[0] === 2) {
    handTypeRank = 2; // One Pair
  }
  return [handTypeRank, ...tieBreakers];
}

function compareScores(scoreA, scoreB) {
  for (let i = 0; i < scoreA.length; i++) {
    if (scoreA[i] !== scoreB[i]) {
      return scoreA[i] - scoreB[i];
    }
  }
  return 0;
}