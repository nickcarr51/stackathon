import React from 'react';
import { BrowserRouter, HashRouter, Route, Switch, Redirect } from 'react-router-dom';
import { CssBaseline, Button, Grid } from '@material-ui/core';
import { connect } from 'react-redux';
import { Search, Dig } from './components/index';
import Callback from './callback';
import { login } from './redux/actions';

const App = ({ login }) => {

  const handleCode = () => {

  }

  const handleCallback = ({ location }) => {
    return <Callback location={location} handleCode={handleCode} />
  }

  return (
    <div>
      <CssBaseline>
        <HashRouter>
          <Switch>
            <Route exact path='/' render={(props) => <Search props={props} /> } />
            <Route path='/dig/:id?' render={(props) => <Dig props={props} /> } />
            <Route exact path='/callback' render={(props) => <Callback props={props} /> } />
            <Redirect to='/' />
          </Switch>
        </HashRouter>
        {/* <Grid container justify='center'>
          <Button><a href='/login'>Create Playlist</a></Button>
        </Grid> */}
      </CssBaseline>
    </div>
  )
}

const mapDispatchToProps = { login }

export default connect(null, mapDispatchToProps)(App);