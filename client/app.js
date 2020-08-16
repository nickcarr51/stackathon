import React from 'react';
import { BrowserRouter, Route, Switch, Redirect } from 'react-router-dom';
import { CssBaseline } from '@material-ui/core';
import { Search } from './components/index';

const App = () => {
  return (
    <div>
      <CssBaseline>
        <BrowserRouter>
          <Switch>
            <Route exact path='/' render={(props) => <Search props={props} /> } />
            <Route path='/dig/:id?' render={(props) => <Search props={props} /> } />
            <Redirect to='/' />
          </Switch>
        </BrowserRouter>
      </CssBaseline>
    </div>
  )
}

export default App;