import React from 'react';
import { Switch, Route } from 'react-router-dom';
import { GlobalStyle } from './GlobalStyles';

function App() {
  return (
    <>
      <GlobalStyle />
      <Switch>
        <Route exact path='/' component={() => <h1>1234</h1>} />
      </Switch>
    </>
  );
}

export default App;
