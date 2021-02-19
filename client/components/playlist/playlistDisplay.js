import React from 'react';
import { Grid, Accordion, AccordionSummary, AccordionDetails, Typography, Button } from '@material-ui/core';
import { makeStyles } from '@material-ui/core/styles';
import ExpandMoreIcon from '@material-ui/icons/ExpandMore';
import Spotify_Icon_CMYK_White from '../../../public/assets/images/Spotify_Icon_CMYK_White.png';
import Playlist from '../playlist/playlist';
import SongEnergy from '../songEnergyChart/songEnergy';
import SongDanceability from '../songEnergyChart/danceabilityChart';
import SongTempo from '../songEnergyChart/tempoChart';

const useStyles = makeStyles((theme) => ({
  button: {
    color: '#ffffff'
  }
}))

const PlaylistDisplay = ({ currPlaylist }) => {

  const classes = useStyles();
  return (
    <Grid container direction='column' alignItems='center' justify='center'>
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
              <Typography variant='h5'>Tempo</Typography>
              <SongTempo currPlaylist={currPlaylist} />
              <Typography variant='h5'>Energy</Typography>
              <SongEnergy currPlaylist={currPlaylist} />
              <Typography variant='h5'>Danceability</Typography>
              <SongDanceability currPlaylist={currPlaylist} />
            </Grid>
          </AccordionDetails>
        </Accordion>
      </Grid>
      <Grid container justify='center' style={{marginBottom: '20px'}}>
        <a className='spotifyButton' href='/login'><Button className={classes.button}>Create Playlist<img className='spotifyIcon' src={Spotify_Icon_CMYK_White} /></Button></a>
      </Grid>
    </Grid>
  )
}

export default PlaylistDisplay;