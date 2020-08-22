import React, { useState, useEffect } from 'react'
import { AppBar, Typography, FormControlLabel, Switch, Grid, Backdrop } from '@material-ui/core';
import InfoIcon from '@material-ui/icons/Info';
import { connect } from 'react-redux';
import { toggleCamelot, sendHome } from '../../redux/actions'; 
import CamelotWheel from '../../../public/assets/images/CamelotWheel.png';

const NavBar = ({ camelot, toggleCamelot, sendHome }) => {
  const [open, setOpen] = useState(false);
  const [width, setWidth] = useState(window.screen.width)
  const handleClose = () => {
    setOpen(false);
  };

  const handleToggle = () => {
    setOpen(!open);
  };

  useEffect(() => {
    setWidth(window.screen.width);
  },[window.screen.width])

  return (
    <AppBar position='fixed' >
      <Grid container justify='flex-start'>
        <a className='homeButton' href='/'><Typography variant='h5' style={{margin:'0px 20px'}}>digInKey</Typography></a>
        <FormControlLabel 
          control={<Switch checked={camelot} onChange={toggleCamelot} />}
          label='Key/Camelot'
        />
        <InfoIcon className='icon' onClick={handleToggle} style={{marginTop: '7px'}} />
        <Backdrop open={open} onClick={handleClose}>
          <Grid container item justify='center' align='center' sm={12} xs={12} md={5} lg={8}>
            {
              width >= 500
              ? <img src={CamelotWheel} style={{display: 'flex', height: 'auto'}} />
              : <img src={CamelotWheel} style={{maxWidth: '400px', maxHeight: '400px'}} />
            }
          </Grid>
        </Backdrop>
      </Grid>
    </AppBar>
  )
}

const mapStateToProps = state => {
  return {
    camelot: state.camelot,
  }
}

const mapDispatchToProps = { toggleCamelot, sendHome }

export default connect(mapStateToProps, mapDispatchToProps)(NavBar);