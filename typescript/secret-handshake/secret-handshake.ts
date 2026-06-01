type HandshakeAction = 'wink' | 'double blink' | 'close your eyes' | 'jump';

export function commands(code: number): HandshakeAction[] {
  const HANDSHAKE_ACTIONS: HandshakeAction[] = [
    'wink', 'double blink', 'close your eyes', 'jump'
  ];
  const actions: HandshakeAction[] = [];

  HANDSHAKE_ACTIONS.forEach((action, index) => {
    if ((code & (1 << index)) !== 0) {
      actions.push(action);
    }
  });
  if ((code & (1 << 4)) !== 0) {
    actions.reverse();
  }
  return actions;
}
