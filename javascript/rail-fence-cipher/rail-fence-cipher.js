//
// This is only a SKELETON file for the 'Rail Fence Cipher' exercise. It's been provided as a
// convenience to get you started writing code faster.
//
function getRailIndices(length, rails) {
  if (rails === 1) return Array.from({ length }, () => 0);
  const cycle = 2 * rails - 2;
  return Array.from({ length }, (_, i) => {
    const mod = i % cycle;
    return mod < rails ? mod : cycle - mod;
  }) 
}

export const encode = (string, rails) => {
  if (!string || rails <= 1) return string;
  const indices = getRailIndices(string.length, rails);
  let result = '';
  for (let r = 0; r < rails; r++) {
    for (let i = 0; i < string.length; i++) {
      if (indices[i] === r) {
        result += string[i];
      }
    }
  }
  return result;
};

export const decode = (string, rails) => {
  if (!string || rails <= 1) return string;
  const indices = getRailIndices(string.length, rails);
  const railCounts = Array(rails).fill(0);
  indices.forEach(r => railCounts[r]++);

  const railPointers = Array(rails).fill(0);
  let currentOffset = 0;
  const railSlices = [];

  for (let r = 0; r < rails; r++) {
    railSlices[r] = string.slice(currentOffset, currentOffset + railCounts[r]);
    currentOffset += railCounts[r];
  }

  let result = ''
  for (let i = 0; i < string.length; i++) {
    const r = indices[i];
    result += railSlices[r][railPointers[r]++];
  }
  return result;
};
