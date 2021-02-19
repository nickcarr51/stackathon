import React from 'react';
import { connect } from 'react-redux';
import { getSimilar, addToPlaylist } from '../../redux/actions';
import { truncateSixty } from '../../utils';
import { Grid, Typography } from '@material-ui/core';
import { makeStyles } from '@material-ui/core/styles';
import ShuffleIcon from '@material-ui/icons/Shuffle';
import PlaylistAddIcon from '@material-ui/icons/PlaylistAdd';
import SpotifyPlayer from 'react-spotify-player';

const useStyles = makeStyles((theme) => ({
  songGrid: {
    margin: '10px',
    height: 'auto',
    alignItems: 'center',
  },
  topRow: {
    margin: '10px'
  },
  trackName: {
    fontSize: '1.3rem',
  },
  bottomRow: {
    marginRight: '20px'
  },
  tempoKey: {
    margin: '0px 10px'
  }
}))

const MainTrackContainer = ({ props, mainTrack, mainTrackInfo, mainKey, harmonicKeys, camelot, getSimilar, addToPlaylist }) => {

  const shuffle = () => {
    getSimilar(props.match.params.id, harmonicKeys);
  }

  const handleAdd = (e) => {
    e.preventDefault();
    addToPlaylist(mainTrack, mainTrackInfo, mainKey);
  }

  const classes = useStyles()
  return (
    <Grid className={classes.songGrid} container justify='space-between'>
      <Grid className={classes.topRow} item container direction='row' justifycontent='space-apart' xs={12}>
        <Grid container item direction='column' xs={9}>
          <Typography variant='subtitle1'>{mainTrack.artists.map(artist => artist.name).join(', ')}</Typography>
            <Typography className={classes.trackName}>{truncateSixty(mainTrack.name)}</Typography>
        </Grid>
        <Grid container item direction='row' justify='space-evenly' alignitems='center' xs={3}>
          <ShuffleIcon className='icon' onClick={shuffle} />
          <PlaylistAddIcon className='icon' onClick={handleAdd} />
        </Grid>
      </Grid>
      <Grid className={classes.bottomRow} container item direction='row' justify='space-between' xs={12}>
        <Grid container item xs={12} sm={12} md={6} lg={6}>
          <div style={{padding: '10px'}}>
            {/* <SpotifyPlayer uri={mainTrack.uri} size='compact' view='coverart' theme='white' /> */}
            <iframe src={`https://open.spotify.com/embed/track/${mainTrack.id}`} width="300" height="80" frameBorder="0" allowtransparency="true" allow="encrypted-media"></iframe>
          </div>
        </Grid>
        <Grid container item direction='row' xs={12} sm={12} md={6} lg={6}>
          <Grid container item direction='column' justify='space-evenly' xs={6}>
            <Typography className={classes.tempoKey} variant='h6'>{camelot ? `${mainKey.camelotPosition}${mainKey.mode === 0 ? 'A' : 'B'}`: mainKey.name}</Typography>
            <Typography className={classes.tempoKey} variant='subtitle1'>Energy:{' '}{ Math.floor(mainTrackInfo.energy * 100)}</Typography>
          </Grid>
          <Grid container item direction='column' justify='space-evenly' xs={6}>
            <Typography className={classes.tempoKey} variant='h6'>{ Math.floor(mainTrackInfo.tempo)}{' '}BPM</Typography>
            <Typography className={classes.tempoKey} variant='subtitle1'>Danceability:{' '}{ Math.floor(mainTrackInfo.danceability * 100)}</Typography>
          </Grid>
        </Grid>
      </Grid>
    </Grid>
  )
}

const mapStatetoProps = state => {
  return {
    camelot: state.camelot
  }
}

const mapDispatchToProps = { getSimilar, addToPlaylist }

export default connect(mapStatetoProps, mapDispatchToProps)(MainTrackContainer);