import React, {useState, useEffect} from 'react';
import { Grid, Typography } from '@material-ui/core';
import { connect } from 'react-redux';
import CloseIcon from '@material-ui/icons/Close';
import { makeStyles } from '@material-ui/core/styles';
import { deleteFromPlaylist } from '../../redux/actions';
import { truncateThirty, truncateSixty } from '../../utils';

const useStyles = makeStyles(theme => ({
  container: {
    padding: '20px'
  },
  songGrid: {
    margin: '10px 0px',
    paddingLeft: '10px',
    height: 'auto',
    alignItems: 'center',
  },
  trackName: {
    fontSize: '1.3rem',
  },
  bottomRow: {
    marginRight: '20px'
  },
  tempoKey: {
    margin: '0px 10px'
  },
  topRow: {
    margin: '10px'
  },
}));

const PlaylistCard = ({ track, deleteFromPlaylist, camelot }) => {
  const [screenWidth, setWidth] = useState(window.screen.width);

  useEffect(() => {
    setWidth(window.screen.width);
  }, [window.screen.width])

  const handleDelete = () => {
    deleteFromPlaylist(track.songId, track.name);
  }
  const classes = useStyles();
  return (
    <Grid container className={classes.songGrid}>
      <Grid className={classes.topRow} item container direction='row' justifycontent='space-apart' xs={12}>
        <Grid container item direction='column' xs={10}>
          <Typography variant='subtitle2'>{track.artists.join(', ')}</Typography>
          {
            screenWidth >= 960
            ? <Typography className={classes.trackName}>{truncateSixty(track.name)}</Typography>
            : <Typography className={classes.trackName}>{truncateThirty(track.name)}</Typography>
          }
        </Grid>
        <Grid container item direction='row' justify='center' alignitems='center' xs={2}>
          <CloseIcon className='icon' onClick={handleDelete} />
        </Grid>
      </Grid>
      <Grid className={classes.bottomRow} container item direction='row' justify='center' alignitems='center' xs={12}>
        <Grid container item direction='column' justify='space-evenly' xs={6}>
          <Typography variant='h6' className={classes.tempoKey}>
            {camelot ? track.camelotKey : track.key}
          </Typography>
          <Typography variant='subtitle1' className={classes.tempoKey}>
              Energy:{' '}{Math.floor(track.energy * 100)}
          </Typography>
        </Grid>
        <Grid container item direction='column' justify='space-evenly' xs={6}>
          <Typography variant='h6' className={classes.tempoKey}>
            {Math.floor(track.tempo)}{' '}BPM
          </Typography>
          <Typography variant='subtitle1' className={classes.tempoKey}>
            Danceability:{' '}{Math.floor(track.danceability * 100)}
          </Typography>
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

export default connect(mapStateToProps, { deleteFromPlaylist })(PlaylistCard);