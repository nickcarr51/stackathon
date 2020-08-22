import React, { useEffect } from 'react';
import { connect } from 'react-redux';
import { Paper, Button, Grid } from '@material-ui/core';
import { getPlaylist, clearPlaylist } from '../../redux/actions';
import CloseIcon from '@material-ui/icons/Close';
import PlaylistResults from './playlistResults';

const Playlist = ({ currPlaylist, getPlaylist, clearPlaylist }) => {
  useEffect(() => {
    getPlaylist()
  },[currPlaylist.length])

  const handleClear = (e) => {
    e.preventDefault();
    clearPlaylist();
  }
  return (
    <Grid item style={{ width: '100%'}} >
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