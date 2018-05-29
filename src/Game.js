import React from 'react';

import Board from './Board';

import './Game.css';


const BLANK = ' ';
const X = 'X';
const O = 'O';

export default class Game extends React.Component {

  constructor(props) {
    super(props);
    this.state = {
      history : [{
        squares: Array(9).fill(BLANK),
        movePosition: undefined
      }],
      xIsNext : true,
      stepNumber: 0
    };
  }

  isGameToken(e) {
    return e !== BLANK;
  }

  calculateWinner(squares) {
    const lines = [
      [0, 1, 2],
      [3, 4, 5],
      [6, 7, 8],
      [0, 3, 6],
      [1, 4, 7],
      [2, 5, 8],
      [0, 4, 8],
      [2, 4, 6],
    ];
    for (let i = 0; i < lines.length; i++) {
      const [a, b, c] = lines[i];
      if (this.isGameToken(squares[a]) && squares[a] && squares[a] === squares[b] && squares[a] === squares[c]) {
        return squares[a];
      }
    }
    return BLANK;
  }

  // there are prototype methods and static methods

  // maps [0:8] to [1:3,1:3]
  static toRowCol(i) {
    let row = Math.floor(i / 3) + 1;
    let col = Math.floor(i % 3) + 1;
    return [row, col];
  }

  //  It is conventional in React apps to use on* names for the attributes
  // and handle* for the handler methods
  handleClick(i) {

    // can use destructuring to assign result
    let [row, col] = Game.toRowCol(i);
    console.log('played row, col: ' + row + ', ' + col);

    // create new objects instead of mutating the old ones
    const history = this.state.history.slice(0, this.state.stepNumber + 1);
    const current = history[history.length - 1];
    const squares = current.squares.slice(0);

    // only update if it's not been clicked on before
    if(this.isGameToken(squares[i])) {
      console.log('square was played');
      return;
    }

    // only update if game hasn't been won
    if(this.isGameToken(this.calculateWinner(squares))) {
      console.log('game is over');
      return;
    }

    // this is a valid move, let's update the state
    squares[i] = this.state.xIsNext ? X : O;

    // array.concat returns a new array, array.push modifies existing array
    // favor immutability and full object replacement to make it easier to do shallow comparisons
    this.setState({
      history: history.concat([{
        squares : squares,
        movePosition: {row, col}
      }]),
      stepNumber: history.length,
      xIsNext: !this.state.xIsNext,
    });
  }

  jumpTo(step) {
    this.setState({
      stepNumber: step,
      xIsNext: (step % 2) === 0,
    });
  }

  render() {

    const history = this.state.history;
    const current = history[this.state.stepNumber];

    // Warning: Each child in an array or iterator should have a unique "key" prop.
    // key is a special property that's resolved by React
    // Component keys don’t need to be globally unique, only unique relative to the immediate siblings.
    const moves = history.map((step, moveNumber) => {

      const selectedStyle = this.state.stepNumber === moveNumber ? 'highlighted' : '';
      const position = step.movePosition;
      const description = (moveNumber === 0)
        ? 'Go to game start'
        : 'Go to move #' + moveNumber + ' (' + position.row + ',' + position.col + ')';
      return (
        // setting key = index is not the correct choice if you ever reorder elements in the list
        // or add/remove items anywhere but the bottom of the list
        // here we only change the list at the bottom and we don't reorder the list, so here it's ok

        <li key={moveNumber} >
          <button className={selectedStyle} onClick={()=> this.jumpTo(moveNumber)}>{description}</button>
        </li>
      );
    });


    const winner = this.calculateWinner(current.squares);
    const status = this.isGameToken(winner)
      ? 'Winner: ' + winner
      : 'Next player: ' + (this.state.xIsNext ? X : O);

    return (
      <div className="game">
        <div className="game-board">
          <Board
            squares={current.squares}
            onClick={(i) => this.handleClick(i)}
          />
        </div>
        <div className="game-info">
          <div>{status}</div>
          <ol>{moves}</ol>
        </div>
      </div>
    );
  }

}