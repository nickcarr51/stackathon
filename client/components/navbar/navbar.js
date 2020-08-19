import React from 'react'
import { AppBar, Typography, FormControlLabel, Switch, Grid } from '@material-ui/core';
import { connect } from 'react-redux';
import { toggleCamelot } from '../../redux/actions'; 

const NavBar = ({ camelot, toggleCamelot }) => {
  return (
    <AppBar position='fixed' >
      <Grid container justify='space-between'>
        <Typography variant='h5' style={{marginLeft:'20px'}}>digInKey</Typography>
        <FormControlLabel 
          control={<Switch checked={camelot} onChange={toggleCamelot} />}
          label='Key/Camelot'
        />
      </Grid>
    </AppBar>
  )
}

const mapStateToProps = state => {
  return {
    camelot: state.camelot,
  }
}

const mapDispatchToProps = { toggleCamelot }

export default connect(mapStateToProps, mapDispatchToProps)(NavBar);