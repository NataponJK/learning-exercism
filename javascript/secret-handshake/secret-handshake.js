//
// This is only a SKELETON file for the 'Secret Handshake' exercise. It's been provided as a
// convenience to get you started writing code faster.
//

export const commands = (code) => {
  const HANDSHAKE_ACTIONS = ['wink', 'double blink', 'close your eyes', 'jump'];
  const actions = [];

  HANDSHAKE_ACTIONS.forEach((action, index) => {
    if ((code & (1 << index)) !== 0) {
      actions.push(action);
    }
  });

  if ((code & (1 << 4)) !== 0) {
    actions.reverse();
  }
  return actions;
};
