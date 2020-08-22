import React, { useState, useEffect } from 'react';
import { connect } from 'react-redux';
import { initSearch, clearSearch, getPlaylist } from '../../redux/actions';
import { makeStyles } from '@material-ui/core/styles';
import { Paper, TextField, Button, Grid, Accordion, AccordionSummary, AccordionDetails, Typography } from '@material-ui/core';
import ExpandMoreIcon from '@material-ui/icons/ExpandMore';
import CloseIcon from '@material-ui/icons/Close';
import Spotify_Icon_CMYK_White from '../../../public/assets/images/Spotify_Icon_CMYK_White.png';
import SearchResults from './searchResults';
import Playlist from '../playlist/playlist';
import SongEnergy from '../songEnergyChart/songEnergy';
import SongDanceability from '../songEnergyChart/danceabilityChart';

const useStyles = makeStyles((theme) => ({
  textField: {
    width: '80%',
    marginTop: '10px'
  },
  form: {
    display: 'flex',
    justifyContent: 'center'
  },
  button: {
    color: '#ffffff'
  }
}))

const Search = ({ initSearch, initSearchResults, initSearchInfo, currPlaylist, clearSearch, getPlaylist}) => {
  const [input, setInput] = useState('');

  useEffect(() => {
    window.scroll(0, 0);
  },[])

  useEffect(() => {
    getPlaylist()
  },[currPlaylist.length])

  useEffect(() => {
    clearSearch();
  },[]);

  const handleInput = (e) => {
    setInput(e.target.value)
  }

  const handleSubmit = (e) => {
    e.preventDefault();
    initSearch(input);
  }

  const handleClearSearch = () => {
    clearSearch()
    setInput('');
  }

  const classes = useStyles();

  return (
    <Grid container spacing={0} direction='column' alignItems='center' justify='center' style={{ minHeight: '100vh '}} >
      <Grid item lg={5} md={8} sm={12} style={{ width: '100%'}} >
        <Paper>
          <form className={classes.form} onSubmit={handleSubmit}>
            <TextField className={classes.textField} value={input} onChange={handleInput} fullWidth={true} label='Search Spotify'/>
          </form>
          <SearchResults results={initSearchResults} resultsInfo={initSearchInfo} />
            {
              initSearchResults.length && initSearchInfo.length
              ? <Button onClick={handleClearSearch}>Clear Results<CloseIcon /></Button>
              : null
            }
        </Paper>
      </Grid>
      {
        currPlaylist.length
        ? <Grid container direction='column' alignItems='center' justify='center'>
            <Grid item lg={5} md={8} sm={12} style={{ width: '100%', margin: '10px 0px'}} >
              <Accordion>
                <AccordionSummary expandIcon={<ExpandMoreIcon />}>
                  <Typography>Playlist</Typography>
                </AccordionSummary>
                <AccordionDetails>
                  <Playlist />
                </AccordionDetails>
              </Accordion>
            </Grid>
            <Grid item lg={5} md={8} sm={12} style={{ width: '100%', margin: '10px 0px' }} >
              <Accordion>
                <AccordionSummary expandIcon={<ExpandMoreIcon />}>
                  <Typography>Insights</Typography>
                </AccordionSummary>
                <AccordionDetails>
                  <Grid container direction='column'>
                    <Typography>Energy</Typography>
                    <SongEnergy currPlaylist={currPlaylist} />
                    <Typography>Danceability</Typography>
                    <SongDanceability currPlaylist={currPlaylist} />
                  </Grid>
                </AccordionDetails>
              </Accordion>
            </Grid>
            <Grid container justify='center'>
              <a className='spotifyButton' href='/login'><Button className={classes.button}>Create Playlist<img className='spotifyIcon' src={Spotify_Icon_CMYK_White} /></Button></a>
            </Grid>
          </Grid>
        : null
      }
    </Grid>
  )
}

const mapStateToProps = (state) => {
  return {
    initSearchResults: state.initSearchResults,
    initSearchInfo: state.initSearchInfo,
    currPlaylist: state.currPlaylist
  }
}

const mapDispatchToProps = { initSearch, clearSearch, getPlaylist };

export default connect(mapStateToProps, mapDispatchToProps)(Search);
