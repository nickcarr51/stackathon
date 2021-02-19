import React, { useEffect } from 'react';
import { Grid, CircularProgress, Typography } from '@material-ui/core';

const PlaylistError = ({ props }) => {
  useEffect(() => {
    setTimeout(() => {
      props.history.push('/')
    }, 3000)
  },[])

  return (
    <Grid container item direction='column' justify='center' align='center' style={{marginTop: '100px'}}>
      <Typography variant='h5'>Something went wrong! Bringing you back to your playlist...</Typography>
      {/* <Typography variant='subtitle1'>Let's dig for more songs...</Typography> */}
      <Grid>
        <CircularProgress />
      </Grid>
    </Grid>
  )
}

export default PlaylistError;
