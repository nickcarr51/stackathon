import React from 'react';
import { Paper, Button, Grid } from '@material-ui/core';
import { makeStyles } from '@material-ui/core/styles';
import PlaylistCard from './playlistCard';

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
    height: '150px',
    margin: '10px 0px'
  }
}));

const PlaylistResults = ({ currPlaylist }) => {
  const classes = useStyles()
  return (
    <div
    style={{
      height: '500px',
      overflowY: 'scroll',
      marginTop: '20px'
    }}
    >
      <Grid
        container
        direction='column'
        justify='space-around'
        alignItems='stretch'
      >
        {
          currPlaylist.map(track => {
            return (
            <Grid key={track.id} item xs={12} className={classes.gridItem}>
              <Paper elevation={3}>
                <PlaylistCard track={track} />
              </Paper>
            </Grid>
            )
          })
        }
      </Grid>
  </div>
  )
}

export default PlaylistResults;