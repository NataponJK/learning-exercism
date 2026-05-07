export function gamestate(board: string[]): 'win' | 'draw' | 'ongoing' {
  const flatBoard = board.join('');
  //in this case .match() might return 'null'
  const xCount = flatBoard.split('X').length - 1;
  const oCount = flatBoard.split('O').length - 1;
  //Validate turn order
  if (oCount > xCount){
    throw new Error(`Wrong turn order: O started`);
  }
  if (xCount > oCount + 1){
    throw new Error(`Wrong turn order: X went twice`);
  }
  //Wining lines
  const winLines = [
    ...board, //Rows
    ...[0, 1, 2].map(i => board[0][i] + board[1][i]+ board[2][i]), //Cols
    board[0][0] + board[1][1] + board[2][2], //Diag 1
    board[0][2] + board[1][1] + board[2][0], //Diag 2
  ]
  const xWins = winLines.includes('XXX'); //.includes() for low flexibility, and only string or []
  const oWins = winLines.includes('OOO');
  //Impossible boards
  if (xWins && oWins) throw new Error(`Impossible board: game should have ended after the game was won`);
  //Win conditions
  if (xWins || oWins) return 'win';
  if (flatBoard.includes(' ')) return 'ongoing';
  return 'draw';
}
