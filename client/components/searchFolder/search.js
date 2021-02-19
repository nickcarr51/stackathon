import React, { useState, useEffect } from 'react';
import { connect } from 'react-redux';
import { initSearch, clearSearch, getPlaylist } from '../../redux/actions';
import { makeStyles } from '@material-ui/core/styles';
import { Paper, TextField, Button, Grid } from '@material-ui/core';
import CloseIcon from '@material-ui/icons/Close';
import SearchResults from './searchResults';
import PlaylistDisplay from '../playlist/playlistDisplay';

const useStyles = makeStyles((theme) => ({
  textField: {
    width: '80%',
    marginTop: '10px'
  },
  form: {
    display: 'flex',
    justifyContent: 'center'
  },
  button: {
    color: '#ffffff'
  }
}))

const Search = ({ initSearch, initSearchResults, initSearchInfo, currPlaylist, clearSearch, getPlaylist}) => {
  const [input, setInput] = useState('');

  useEffect(() => {
    window.scroll(0, 0);
  },[])

  useEffect(() => {
    getPlaylist()
  },[currPlaylist.length])

  useEffect(() => {
    clearSearch();
  },[]);

  const handleInput = (e) => {
    setInput(e.target.value)
  }

  const handleSubmit = (e) => {
    e.preventDefault();
    initSearch(input);
  }

  const handleClearSearch = () => {
    clearSearch()
    setInput('');
  }

  const classes = useStyles();

  return (
    <Grid container spacing={0} direction='column' alignItems='center' justify='center' style={{ minHeight: '100vh '}} >
      <Grid item lg={5} md={8} sm={12} style={{ width: '100%'}} >
        <Paper>
          <form className={classes.form} onSubmit={handleSubmit}>
            <TextField className={classes.textField} value={input} onChange={handleInput} fullWidth={true} label='Search Spotify'/>
          </form>
          <SearchResults results={initSearchResults} resultsInfo={initSearchInfo} />
            {
              initSearchResults.length && initSearchInfo.length
              ? <Button onClick={handleClearSearch}>Clear Results<CloseIcon /></Button>
              : null
            }
        </Paper>
      </Grid>
      {
        currPlaylist.length
        ? <PlaylistDisplay currPlaylist={currPlaylist} />
        : null
      }
    </Grid>
  )
}

const mapStateToProps = (state) => {
  return {
    initSearchResults: state.initSearchResults,
    initSearchInfo: state.initSearchInfo,
    currPlaylist: state.currPlaylist
  }
}

const mapDispatchToProps = { initSearch, clearSearch, getPlaylist };

export default connect(mapStateToProps, mapDispatchToProps)(Search);
