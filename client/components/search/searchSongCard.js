import React, {useState, useEffect} from 'react';
import { Button, Grid, Typography } from '@material-ui/core';
import { connect } from 'react-redux';
import { makeStyles } from '@material-ui/core/styles';
import { Link } from 'react-router-dom';
import SpotifyPlayer from 'react-spotify-player';
import { getKey } from 'camelot-wheel';
import { addToPlaylist } from '../../redux/actions';

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
    width: '100%',
    maxHeight: '36px'
  },
  artistName: {
    marginLeft: '20px'
  },
  songGrid: {
    margin: '10px 0px'
  },
  tempoKey: {
    margin: '0px 10px'
  }
}));

const SearchSongCard = ({ track, trackInfo, addToPlaylist, camelot }) => {
  const [currKey, setCurrKey] = useState({})

  // const [cardCamelot, setCardCamelot] = useState(camelot);

  // useEffect(() => {
  //   setCardCamelot(camelot);
  // },[!camelot])
  
  useEffect(() => {
    setCurrKey(getKey({pitchClass: trackInfo.key, mode: trackInfo.mode }))
  },[])

  const handleAdd = (e) => {
    e.preventDefault();
    addToPlaylist(track, trackInfo, currKey);
  }

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
          sm={7}
          xs={12}
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
          // direction='column'
          justify='space-evenly'
          style={{margin: '10px 0px'}}
          xs={12}
          sm={5}
        >
          <Grid
            item
            container
            // justify='space-between'
            direction='row'
            xs={6}
            sm={6}
          >
            <Grid container direction='column'>
              <Typography
                variant='subtitle1'
                className={classes.tempoKey}
              >{camelot ? `${currKey.camelotPosition}${currKey.mode === 0 ? 'A' : 'B'}`: currKey.name}</Typography>
              <Typography
                variant='subtitle1'
                className={classes.tempoKey}
              >{Math.floor(trackInfo.tempo)}{' '}BPM</Typography>
            </Grid>
          </Grid>
          <Grid
            item
            container
            // justify='space-between'
            direction='row'
            xs={6}
            sm={6}
          >
            <Grid container direction='column'>
              <Typography
                variant='subtitle1'
                className={classes.tempoKey}
              >Energy{' '}{Math.floor(trackInfo.energy * 100)}</Typography>
              <Typography
                variant='subtitle1'
                className={classes.tempoKey}
              >Danceability{' '}{Math.floor(trackInfo.danceability * 100)}</Typography>
            </Grid>
            <Button onClick={handleAdd} variant="contained" className={classes.button}>Add</Button>
          </Grid>
        </Grid>
      </Grid>
    // </div>
  )
}

// const mapStateToProps = state => {
//   return {
//     camelot: state.camelot,
//   }
// }

// export default connect(mapStateToProps, { addToPlaylist })(SearchSongCard);
export default connect(null, { addToPlaylist })(SearchSongCard);
