import React, { useEffect } from 'react';
import { connect } from 'react-redux';
import { Box, Paper, TextField, Button, Grid } from '@material-ui/core';
import { makeStyles } from '@material-ui/core/styles';
import { getPlaylist } from '../../redux/actions';
import PlaylistResults from './playlistResults';

const useStyles = makeStyles((theme) => {

})

const Playlist = ({ currPlaylist, getPlaylist }) => {
  useEffect(() => {
    getPlaylist()
  },[currPlaylist.length])
  console.log('CURRENT PLAYLIST', currPlaylist);
  return (
    <Grid
    item
    lg={5}
    md={8}
    sm={12}
    style={{ width: '80%'}}
    >
    <Paper>
      {
        currPlaylist.length &&
        <PlaylistResults currPlaylist={currPlaylist} />
      }
    </Paper>
  </Grid>
  )
}

const mapStateToProps = state => {
  return {
    currPlaylist: state.currPlaylist
  }
}

const mapDispatchToProps = { getPlaylist }

export default connect(mapStateToProps, mapDispatchToProps)(Playlist);