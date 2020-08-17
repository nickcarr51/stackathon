import React from 'react';
import { Paper, Button, Grid } from '@material-ui/core';
import { makeStyles } from '@material-ui/core/styles';
import { Link } from 'react-router-dom';
import SearchSongCard from './searchSongCard';

const useStyles = makeStyles(theme => ({
  paper: {
    // height: '100px',
    // margin: '15px',
    // display: 'flex',
    // alignItems: 'center',
    // justifyContent: 'space-apart'
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
  },
  gridItem: {
    height: '150px'
  }
}));

const SearchResults = ({ results, resultsInfo }) => {
  const classes = useStyles();
  // console.log('RESULTSIINFO', resultsInfo);
  return (
    <div
      style={{
        height: '500px',
        overflowY: 'scroll',
        marginTop: '20px'
      }}
    >
      {
        results.length && resultsInfo.length
        ? <Grid
            container
            direction='column'
            justify='space-around'
            alignItems='stretch'
          >
            {
              results.map(track => {
                const trackInfo = resultsInfo.find(info => info.id === track.id)
                return (
                  // <div 
                  //   key={track.id}
                  //   style={{
                  //     height: '50px'
                  //   }}
                  // >
                  <Grid key={track.id} item xs={12} className={classes.gridItem}>
                    <Paper className={classes.paper} elevation={3}>
                      <SearchSongCard track={track} trackInfo={trackInfo} />
                    </Paper>
                  </Grid>
                  // </div>
                )
              })
            }
          </Grid>
        : null
      }
    </div>
  )
}

export default SearchResults;