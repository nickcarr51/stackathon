import React from 'react';
import { Paper, Button } from '@material-ui/core';
import { makeStyles } from '@material-ui/core/styles';
import { Link } from 'react-router-dom';
import SearchSongCard from './searchSongCard';

const useStyles = makeStyles(theme => ({
  paper: {
    height: '60px',
    margin: '15px',
    display: 'flex',
    alignItems: 'center',
    justifyContent: 'space-apart'
  },
  link: {
    marginLeft: '20px',
  },
  card: {
    display: 'flex',
    width: '100%',
    justifyContent: 'space-between'
  },
  button: {
    marginRight: '20px',
  }
}));

const SearchResults = ({results}) => {
  const classes = useStyles();
  return (
    <div
      style={{
        height: '500px',
        overflowY: 'scroll',
        marginTop: '20px'
      }}
    >
      {
        results.map(track => {
          return (
            <div 
              key={track.id}
              style={{
                height: '50px'
              }}
            >
              <Paper className={classes.paper} elevation={3}>
                <SearchSongCard track={track} />
              </Paper>
            </div>
          )
        })
      }
    </div>
  )
}

export default SearchResults;