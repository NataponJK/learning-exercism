//
// This is only a SKELETON file for the 'Anagram' exercise. It's been provided as a
// convenience to get you started writing code faster.
//

export const findAnagrams = (target, candidates) => {
  const lowerTarget = target.toLowerCase();
  const sortedTarget = [...lowerTarget].sort().join(``);

  return candidates.filter((candidate) => {
    const lowerCandidate = candidate.toLowerCase();
    //Condition 1: Must not be the same word
    if (lowerCandidate === lowerTarget) return false;
    //Condition 2: Must have the same letters;
    return [...lowerCandidate].sort().join(``) === sortedTarget;
  })
};
