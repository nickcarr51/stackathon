import React from 'react';
import { Paper, Button } from '@material-ui/core';
import { makeStyles } from '@material-ui/core/styles';
import { Link } from 'react-router-dom';

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
                <div className={classes.card}>
                  <Link className={classes.link} to={`/dig/${track.id}`}>{track.name} ({track.artists[0].name})</Link>
                  <Button variant="contained" className={classes.button}>Add To Playlist</Button>
                </div>
              </Paper>
            </div>
          )
        })
      }
    </div>
  )
}

export default SearchResults;