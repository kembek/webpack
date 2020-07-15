import React from 'react';
import ReactDOM from 'react-dom';

const App = () => {
  return (
    <div className="react-heading">
      <h2>Hello from React!</h2>
    </div>
  );
};

ReactDOM.render(<App />, document.getElementById('app'));
