import React from 'react';
import { HashRouter, Route, Switch, Redirect } from 'react-router-dom';
import { CssBaseline, Grid } from '@material-ui/core';
import { ToastContainer } from 'react-toastify';
import 'react-toastify/dist/ReactToastify.css';
import { connect } from 'react-redux';
import { Search, Dig, PlaylistCreated } from './components/index';
import { login } from './redux/actions';
import NavBar from './components/navbar/navbar';

const App = () => {
  return (
    <div>
      <CssBaseline>
        <NavBar />
        <Grid>
          <HashRouter>
            <Switch>
              <Route exact path='/' render={(props) => <Search props={props} /> } />
              <Route path='/dig/:id?' render={(props) => <Dig props={props} /> } />
              <Route exact path='/playlistcreated' render={(props) => <PlaylistCreated props={props} /> } />
              <Redirect to='/' />
            </Switch>
          </HashRouter>
        </Grid>
      </CssBaseline>
      <ToastContainer autoClose={1500} />
    </div>
  )
}

const mapDispatchToProps = { login }

export default connect(null, mapDispatchToProps)(App);