
import React from 'react';

import Square from './Square';
import './Board.css';

// functional components inside a component
export default class Board extends React.Component {

  renderSquare(i) {
    return (
      <Square
        key={i}
        value={this.props.squares[i]}
        onClick={() => this.props.onClick(i)}
      />
    );
  }

  renderRow(rowIndex) {
    return (
      <div key={rowIndex} className="board-row">
        {[0,1,2].map(col => this.renderSquare( 3*rowIndex + col))}
      </div>
    );
  }

  render() {
    return (
      <div>
        {[0,1,2].map(row => this.renderRow(row))}
      </div>
    );
  }
}