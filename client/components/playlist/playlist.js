import React, { useEffect } from 'react';
import { connect } from 'react-redux';
import { Box, Paper, TextField, Button, Grid } from '@material-ui/core';
import { makeStyles } from '@material-ui/core/styles';
import { getPlaylist, clearPlaylist } from '../../redux/actions';
import CloseIcon from '@material-ui/icons/Close';
import PlaylistResults from './playlistResults';

const useStyles = makeStyles((theme) => {

})

const Playlist = ({ currPlaylist, getPlaylist, clearPlaylist, songEnergy }) => {
  useEffect(() => {
    getPlaylist()
  },[currPlaylist.length])

  const handleClear = (e) => {
    e.preventDefault();
    clearPlaylist();
  }
  console.log('CURRENT PLAYLIST', currPlaylist);
  console.log('CURRENT PLAYLIST', songEnergy);
  return (
    <Grid
    item
    // lg={5}
    // md={8}
    // sm={12}
    style={{ width: '100%'}}
    >
    <Paper>
      {
        currPlaylist.length &&
        <PlaylistResults currPlaylist={currPlaylist} />
      }
      {
        currPlaylist.length
        ? <Grid container justify='center'>
            <Button onClick={handleClear}>Clear Playlist<CloseIcon /></Button>
          </Grid>
        : null
      }
    </Paper>
  </Grid>
  )
}

const mapStateToProps = state => {
  return {
    currPlaylist: state.currPlaylist,
    songEnergy: state.songEnergy
  }
}

const mapDispatchToProps = { getPlaylist, clearPlaylist }

export default connect(mapStateToProps, mapDispatchToProps)(Playlist);