import React, {useState, useEffect} from 'react';
import { Grid, Typography } from '@material-ui/core';
import { connect } from 'react-redux';
import { makeStyles } from '@material-ui/core/styles';
import PlaylistAddIcon from '@material-ui/icons/PlaylistAdd'
import { Link } from 'react-router-dom';
import SpotifyPlayer from 'react-spotify-player';
import { getKey } from 'camelot-wheel';
import { addToPlaylist } from '../../redux/actions';
import { truncateSixty, truncateThirty } from '../../utils';

const useStyles = makeStyles(theme => ({
  card: {
    display: 'flex',
    width: '100%',
    justifyContent: 'space-between',
  },
  button: {
    marginRight: '20px',
    maxHeight: '36px'
  },
  songGrid: {
    margin: '10px 0px',
    paddingLeft: '10px',
    height: 'auto',
    alignItems: 'center',
  },
  tempoKey: {
    margin: '0px 10px'
  },
  topRow: {
    margin: '10px'
  },
  bottomRow: {
    marginRight: '20px'
  },
  trackName: {
    fontSize: '1.3rem',
  }
}));

const SearchSongCard = ({ track, trackInfo, addToPlaylist, camelot }) => {
  const [currKey, setCurrKey] = useState({})
  const [screenWidth, setScreenWidth] = useState(window.screen.width);
  
  useEffect(() => {
    setCurrKey(getKey({pitchClass: trackInfo.key, mode: trackInfo.mode }))
  },[])

  useEffect(() => {
    setScreenWidth(window.screen.width);
  }, [window.screen.width])

  const handleAdd = (e) => {
    e.preventDefault();
    addToPlaylist(track, trackInfo, currKey);
  }

  const classes = useStyles();
  return (
    <Grid className={classes.songGrid} container justify='space-between'>
      <Grid className={classes.topRow} item container direction='row' justifycontent='space-apart' xs={12}>
        <Grid container item direction='column' xs={10}>
          <Typography variant='subtitle2'>
            {track.artists.map(artist => artist.name).join(', ')}
          </Typography>
          {
            screenWidth >= 960
            ? <Link className={classes.trackName} to={`/dig/${track.id}`}>{truncateSixty(track.name)}</Link>
            : <Link className={classes.trackName} to={`/dig/${track.id}`}>{truncateThirty(track.name)}</Link>
          }
        </Grid>
        <Grid container item direction='row' justify='center' alignitems='center' xs={2}>
          <PlaylistAddIcon className='icon' onClick={handleAdd} />
        </Grid>
      </Grid>
      <Grid className={classes.bottomRow} container item direction='row' justify='space-between' xs={12}>
        <Grid container item xs={12} sm={12} md={6} lg={6}>
          <div style={{padding: '10px'}}>
          <SpotifyPlayer uri={track.uri} size='compact' view='coverart' theme='white' />
          </div>
        </Grid>
        <Grid container item direction='row' xs={12} sm={12} md={6} lg={6}>
            <Grid container item direction='column' justify='space-evenly' xs={6}>
              <Typography variant='h6' className={classes.tempoKey}>
                {camelot ? `${currKey.camelotPosition}${currKey.mode === 0 ? 'A' : 'B'}`: currKey.name}
              </Typography>
              <Typography variant='subtitle1' className={classes.tempoKey}>
                Energy:{' '}{Math.floor(trackInfo.energy * 100)}
              </Typography>
            </Grid>
            <Grid container item direction='column' justify='space-evenly' xs={6}>
              <Typography variant='h6' className={classes.tempoKey}>
                {Math.floor(trackInfo.tempo)}{' '}BPM
              </Typography>
              <Typography variant='subtitle1' className={classes.tempoKey}>
                Danceability:{' '}{Math.floor(trackInfo.danceability * 100)}
              </Typography>
            </Grid>
        </Grid>
      </Grid>
    </Grid>
  )
}

const mapStateToProps = state => {
  return {
    camelot: state.camelot,
  }
}

export default connect(mapStateToProps, { addToPlaylist })(SearchSongCard);
