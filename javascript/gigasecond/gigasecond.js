//
// This is only a SKELETON file for the 'Gigasecond' exercise. It's been provided as a
// convenience to get you started writing code faster.
//
const GIGASECOND_IN_MS = 1e12; //as Milliseconds

export const gigasecond = (inputDate) => {
  const startTimeMs = inputDate.getTime();
  const futureTimeMs = startTimeMs + GIGASECOND_IN_MS;
  return new Date(futureTimeMs); 
};
