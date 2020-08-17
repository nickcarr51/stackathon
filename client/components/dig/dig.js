import React, { useEffect, useState } from 'react';
import { connect } from 'react-redux';
import { getInfo, getTrack } from '../../redux/actions';
import { makeStyles } from '@material-ui/core/styles';
import { Box, Paper, Grid } from '@material-ui/core';

const useStyles = makeStyles((theme) => ({
  paper: {
    marginTop: theme.spacing(3),
    marginBotom: theme.spacing(3),
    padding: theme.spacing(4),
    display: 'flex',
    flexDirection: 'column',
    height: '600px'
  },
  box: {
    margin: '0 auto',
    height: '600px'
  }
}))

const Dig = ({ props, getTrack, getInfo, mainTrack, mainTrackInfo, mainKey }) => {
  const [loaded, setLoaded] = useState(false);
  useEffect(() => {
    getTrack(props.match.params.id)
  },[]);

  useEffect(() => {
    getInfo(props.match.params.id);
  },[]);

  useEffect(() => {
    setLoaded(true);
  },[])
  const classes = useStyles();
  console.log('MAIN TRACK', mainTrack);
  console.log('MAIN TRACK INFO', mainTrackInfo);
  console.log('MAIN KEY', mainKey);
  return (
    <Box width='50%' className={classes.box}>
      <Paper className={classes.paper}>
        {
          loaded
          ? <Grid container spacing={3}>
              <Grid item xs={12}>
                <h1>{mainTrack.name}</h1>
              </Grid>
              <Grid item xs={6}>
                <h2>{ mainKey.name }/{mainKey.camelotPosition}{mainKey.mode === 0 ? 'A' : 'B'}</h2>
              </Grid>
              <Grid item xs={6}>
                <h2>{ Math.floor(mainTrackInfo.tempo)}{' '}BPM</h2>
              </Grid>
            </Grid>
          : null
        }

      </Paper>
    </Box>
  )
}
const mapStateToProps = state => {
  return {
    mainTrack: state.mainTrack,
    mainTrackInfo: state.mainTrackInfo,
    mainKey: state.mainKey
  }
}

const mapDispatchToProps = { getInfo, getTrack }

export default connect(mapStateToProps, mapDispatchToProps)(Dig);