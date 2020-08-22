import React, { useEffect } from 'react';
import { connect } from 'react-redux';
import { Paper, Grid } from '@material-ui/core';
import { makeStyles } from '@material-ui/core/styles';
import SearchSongCard from './searchSongCard';

const useStyles = makeStyles(theme => ({
  card: {
    display: 'flex',
    width: '100%',
    justifyContent: 'space-between'
  },
}));

const SearchResults = ({ results, resultsInfo, camelot }) => {
  useEffect(() => {
    window.scroll(0, 0);
  },[])
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
                  <Grid key={track.id} item xs={12}>
                    <Paper elevation={3}>
                      <SearchSongCard track={track} trackInfo={trackInfo} camelot={camelot} />
                    </Paper>
                  </Grid>
                )
              })
            }
          </Grid>
        : null
      }
    </div>
  )
}

const mapStateToProps = state => {
  return {
    camelot: state.camelot,
  }
}

export default connect(mapStateToProps, {})(SearchResults);