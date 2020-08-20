import React, { useState } from 'react';
import { BrowserRouter, HashRouter, Route, Switch, Redirect } from 'react-router-dom';
import { CssBaseline, Button, Grid, AppBar, Typography, FormControlLabel } from '@material-ui/core';
import { ToastContainer } from 'react-toastify';
import 'react-toastify/dist/ReactToastify.css';
import { connect } from 'react-redux';
import { Search, Dig } from './components/index';
import { login } from './redux/actions';
import NavBar from './components/navbar/navbar';

const App = () => {
  return (
    <div>
      <CssBaseline>
        <NavBar />
        <Grid style={{ margin:'40px 0px'}}>
          <HashRouter>
            <Switch>
              <Route exact path='/' render={(props) => <Search props={props} /> } />
              <Route path='/dig/:id?' render={(props) => <Dig props={props} /> } />
              {/* <Route exact path='/callback' render={(props) => <Callback props={props} /> } /> */}
              <Redirect to='/' />
            </Switch>
          </HashRouter>
          <Grid container justify='center'>
            <Button><a href='/login'>Create Playlist</a></Button>
          </Grid>
        </Grid>
      </CssBaseline>
      <ToastContainer autoClose={1500} />
    </div>
  )
}

const mapDispatchToProps = { login }

export default connect(null, mapDispatchToProps)(App);