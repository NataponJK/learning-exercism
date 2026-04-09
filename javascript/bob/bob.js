//
// This is only a SKELETON file for the 'Bob' exercise. It's been provided as a
// convenience to get you started writing code faster.
//

export const hey = (message) => {
  const speech = message.trim();
  if (speech === "") return `Fine. Be that way!`;

  const isQuestion = speech.endsWith(`?`);
  const isShoting = /[a-z]/i.test(speech) && speech === speech.toUpperCase();

  if (isShoting && isQuestion) return `Calm down, I know what I'm doing!`;
  if (isShoting) return `Whoa, chill out!`;
  if (isQuestion) return `Sure.`;

  return `Whatever.`;
};
