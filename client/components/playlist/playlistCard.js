import React, {useState, useEffect} from 'react';
import { Button, Grid, Typography } from '@material-ui/core';
import { connect } from 'react-redux';
import CloseIcon from '@material-ui/icons/Close';
import { makeStyles } from '@material-ui/core/styles';
import { deleteFromPlaylist } from '../../redux/actions';
import SpotifyPlayer from 'react-spotify-player';


const useStyles = makeStyles(theme => ({
  container: {
    padding: '20px'
  },
  deleteButton: {
    '&hover': {
      cursor: 'pointer'
    }
  }
}));

const PlaylistCard = ({ track, deleteFromPlaylist }) => {

  const handleDelete = () => {
    // e.preventDefault();
    deleteFromPlaylist(track.id);
  }
  const classes = useStyles();
  return (
    <Grid
      container
      className={classes.container}
    >
      <Grid container item direction='column' xs={8}>
        <Typography>{track.artists.join(', ')}</Typography>
        <Typography>{track.name}</Typography>
      </Grid>
      <Grid container item justify='flex-end' xs={4}>
        <Grid container item xs={6} >
          <Typography>{track.key}/{track.camelotKey}</Typography>
          <Typography>{track.tempo}{' '}BPM</Typography>
        </Grid>
        <Grid container item xs={6}>
          <CloseIcon className='icon' onClick={handleDelete} />
        </Grid>
      </Grid>
    </Grid>
  )
}

export default connect(null, { deleteFromPlaylist })(PlaylistCard);