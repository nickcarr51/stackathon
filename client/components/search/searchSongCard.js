import React from 'react';
import { Button } from '@material-ui/core';
import { makeStyles } from '@material-ui/core/styles';
import { Link } from 'react-router-dom';

const useStyles = makeStyles(theme => ({
  link: {
    marginLeft: '20px',
  },
  card: {
    display: 'flex',
    width: '100%',
    justifyContent: 'space-between'
  },
  button: {
    marginRight: '20px',
  }
}));

const SearchSongCard = ({ track }) => {
  const classes = useStyles();
  return (
    <div className={classes.card}>
      <Link className={classes.link} to={`/dig/${track.id}`}>{track.name}</Link>
      <Button variant="contained" className={classes.button}>Add To Playlist</Button>
    </div>
  )
}

export default SearchSongCard;