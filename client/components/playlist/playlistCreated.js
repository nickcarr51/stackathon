import React, { useEffect } from 'react';
import { Grid, CircularProgress, Typography } from '@material-ui/core';

const PlaylistCreated = ({ props }) => {
  useEffect(() => {
    setTimeout(() => {
      props.history.push('/')
    }, 3000)
  },[])

  return (
    <Grid container item direction='column' justify='center' align='center' style={{marginTop: '100px'}}>
      <Typography variant='h5'>Thank you for making a playlist with Dig In Key!</Typography>
      <Typography variant='subtitle1'>Let's dig for more songs...</Typography>
      <Grid>
        <CircularProgress />
      </Grid>
    </Grid>
  )
}

export default PlaylistCreated