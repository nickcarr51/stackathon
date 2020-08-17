import React from 'react';
import { BrowserRouter, HashRouter, Route, Switch, Redirect } from 'react-router-dom';
import { CssBaseline } from '@material-ui/core';
import { Search, Dig } from './components/index';

const App = () => {
  return (
    <div>
      <CssBaseline>
        <HashRouter>
          <Switch>
            <Route exact path='/' render={(props) => <Search props={props} /> } />
            <Route path='/dig/:id?' render={(props) => <Dig props={props} /> } />
            <Redirect from='*' to='/' />
          </Switch>
        </HashRouter>
      </CssBaseline>
    </div>
  )
}

export default App;