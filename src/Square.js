
import React from 'react';
import './Square.css';

// "functional component" has no state or lifecycle, only renders props

export default class Square extends React.Component{
  render() {
    return (
      <button className="square" onClick={this.props.onClick}>
        {this.props.value}
      </button>
    );
  }
}

