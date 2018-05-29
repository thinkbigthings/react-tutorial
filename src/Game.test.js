
import TestRenderer from 'react-test-renderer';
import ShallowRenderer from 'react-test-renderer/shallow';

import Game from './Game';

import React from 'react';

test('Game Play', () => {

  // Return the instance corresponding to the root element, if available.
  // .getInstance() will not work if the root element is a functional component because they don’t have instances
  const game = TestRenderer.create(<Game />).getInstance();

  expect(game.state.stepNumber).toBe(0);
  game.handleClick(0);
  expect(game.state.stepNumber).toBe(1);

});

// describe() can group together tests but it's not required or recommended
describe('Game.toRowCol()', () => {

  test('torowcol 0', () => {
    expect(Game.toRowCol(0)).toEqual([1, 1]);
  });

  test('torowcol 8', () => {
    expect(Game.toRowCol(8)).toEqual([3, 3]);
  });

});



