
import React from 'react';
import ReactDOM from 'react-dom';
import App from './App';

// it() is an alias for test()
it('Render App without crashing', () => {
  const div = document.createElement('div');
  ReactDOM.render(<App />, div);
  ReactDOM.unmountComponentAtNode(div);
});
