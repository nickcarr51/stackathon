import React, { useState } from 'react';
import { connect } from 'react-redux';
import { initSearch, clearSearch } from '../../redux/actions';
import { makeStyles } from '@material-ui/core/styles';
import { Box, Paper, TextField, Button } from '@material-ui/core';
import CloseIcon from '@material-ui/icons/Close';
import SearchResults from './searchResults';

const useStyles = makeStyles((theme) => ({
  paper: {
    marginTop: theme.spacing(3),
    marginBotom: theme.spacing(3),
    padding: theme.spacing(4),
    display: 'flex',
    flexDirection: 'column',
    justifyContent: 'center',
    height: '600px'
  },
  box: {
    margin: '0 auto',
    height: '600px'
  },
  textField: {
    width: '80%'
  }
}))

const Search = ({ initSearch, initSearchResults, clearSearch}) => {
  const [input, setInput] = useState('');

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
  console.log('SEARCH RESULTS', initSearchResults)
  return (
    <Box width='50%' className={classes.box}>
      <Paper className={classes.paper}>
          <form onSubmit={handleSubmit}>
            <TextField value={input} onChange={handleInput} fullWidth={true} label='Search Spotify'/>
          </form>
        <SearchResults results={initSearchResults} />
        {
            initSearchResults.length
            ? <Button onClick={handleClearSearch}>Clear Results<CloseIcon /></Button>
            : null
          }
      </Paper>
    </Box>
  )
}

const mapStateToProps = (state) => {
  return {
    initSearchResults: state.initSearchResults
  }
}

const mapDispatchToProps = { initSearch, clearSearch };

export default connect(mapStateToProps, mapDispatchToProps)(Search);