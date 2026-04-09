export function hey(message: string): string {
  const speech: string = message.trim();

  if (speech === ``) return `Fine. Be that way!`;

  const isQuestion: boolean = speech.endsWith(`?`);
  const isShoting: boolean = /[a-z]/i.test(speech) && speech === speech.toUpperCase();

  if (isQuestion && isShoting) return `Calm down, I know what I'm doing!`;
  if (isShoting) return `Whoa, chill out!`;
  if (isQuestion) return `Sure.`;
  return `Whatever.`;
}
