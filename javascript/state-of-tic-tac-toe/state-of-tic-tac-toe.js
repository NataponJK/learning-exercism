//
// This is only a SKELETON file for the 'State of Tic Tac Toe' exercise. It's been provided as a
// convenience to get you started writing code faster.
//

export const gamestate = (board) => {
  const flatBoard = board.join('');
  const xCount = (flatBoard.match(/X/g) || []).length;
  const oCount = (flatBoard.match(/O/g) || []).length;
  //Validate turn order
  if (oCount > xCount){
    throw new Error(`Wrong turn order: O started`);
  }
  if (xCount > oCount + 1){
    throw new Error(`Wrong turn order: X went twice`);
  }
  //Wining lines(rows, columns, diagonals)
  const lines = [
    board[0], board[1], board[2], //Rows
    [board[0][0], board[1][0], board[2][0]].join(''), //Col 1
    [board[0][1], board[1][1], board[2][1]].join(''), //Col 2
    [board[0][2], board[1][2], board[2][2]].join(''), //Col 3
    [board[0][0], board[1][1], board[2][2]].join(''), //Diag 1
    [board[0][2], board[1][1], board[2][0]].join(''), //Diag 2
  ]
  const xWins = lines.some(line => line === 'XXX');
  const oWins = lines.some(line => line === 'OOO');
  //Impossible boards
  if (xWins && oWins){
    throw new Error(`Impossible board: game should have ended after the game was won`);
  }
  //Win condition
  if (xWins || oWins) return `win`;
  if (flatBoard.includes(' ')) return `ongoing`;
  return `draw` ;
};
