import React, {useState, useEffect} from 'react';
import { Button, Grid, Typography } from '@material-ui/core';
import { makeStyles } from '@material-ui/core/styles';
import { Link } from 'react-router-dom';
import SpotifyPlayer from 'react-spotify-player';
import { getKey } from 'camelot-wheel';

const useStyles = makeStyles(theme => ({
  link: {
    // marginLeft: '20px',
    // fontSize: '1.5rem'
  },
  card: {
    display: 'flex',
    width: '100%',
    justifyContent: 'space-between',
    height: '100px'
  },
  button: {
    marginRight: '20px',
  },
  artistName: {
    marginLeft: '20px'
  },
  songGrid: {
    margin: '10px 0px'
  }
}));

const SearchSongCard = ({ track, trackInfo }) => {
  const [currKey, setCurrKey] = useState({})
  useEffect(() => {
    setCurrKey(getKey({pitchClass: trackInfo.key, mode: trackInfo.mode }))
  },[])
  const classes = useStyles();
  return (
    // <div className={classes.card}>
      <Grid
        className={classes.songGrid}
        container
        justify='space-between'
      >
        <Grid
          item
          xs={10}
        >
          <Typography
            variant='h6'
            className={classes.artistName}
          >
            {track.artists.map(artist => artist.name).join(', ')}
          </Typography>
          <Link to={`/dig/${track.id}`}><Typography variant='h5' noWrap={true} className={classes.artistName}>{track.name}</Typography></Link>
          <div style={{ marginLeft: '20px'}}>
            <SpotifyPlayer uri={track.uri} size='compact' view='coverart' theme='white' />
          </div>
        </Grid>
        <Grid
          container
          item
          direction='column'
          justify='space-between'
          style={{margin: '10px 0px'}}
          xs={2}
        >
            <Typography
              variant='h6'
              className={classes.tempoKey}
            >{currKey.name}</Typography>
            <Typography
              variant='h6'
              className={classes.tempoKey}
            >{Math.floor(trackInfo.tempo)}{' '}BPM</Typography>
          <Button variant="contained" className={classes.button}>Add</Button>
        </Grid>
      </Grid>
    // </div>
  )
}

export default SearchSongCard;