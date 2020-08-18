import React, { useState, useEffect } from 'react';
import { connect } from 'react-redux';
import { initSearch, clearSearch, getPlaylist } from '../../redux/actions';
import { makeStyles } from '@material-ui/core/styles';
import { Box, Paper, TextField, Button, Grid } from '@material-ui/core';
import CloseIcon from '@material-ui/icons/Close';
import SearchResults from './searchResults';
import Playlist from '../playlist/playlist';
import SongEnergy from '../songEnergyChart/songEnergy';
import SongDanceability from '../songEnergyChart/danceabilityChart';

const useStyles = makeStyles((theme) => ({
  paper: {
    // marginTop: theme.spacing(3),
    // marginBotom: theme.spacing(3),
    // padding: theme.spacing(4),
    // display: 'flex',
    // flexDirection: 'column',
    // justifyContent: 'center',
    // height: '600px'
  },
  box: {
    margin: '0 auto',
    height: '600px'
  },
  textField: {
    width: '80%',
    marginTop: '10px'
    // margin: '20px 20px'
  },
  form: {
    display: 'flex',
    justifyContent: 'center'
  }
}))

const Search = ({ initSearch, initSearchResults, initSearchInfo, currPlaylist, clearSearch, getPlaylist}) => {
  const [input, setInput] = useState('');

  useEffect(() => {
    getPlaylist()
  },[currPlaylist.length])

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
  console.log('SEARCH RESULTS', initSearchResults)
  console.log('SEARCH INFO', initSearchInfo)
  return (
    <Grid
      container
      spacing={0}
      direction='column'
      alignItems='center'
      justify='center'
      style={{ minHeight: '100vh '}}
    >
      <Grid
        item
        lg={5}
        md={8}
        sm={12}
        style={{ width: '80%'}}
      >
        <Paper className={classes.paper}>
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
            <Grid         
              item
              lg={5}
              md={8}
              sm={12}
              style={{ width: '80%' }}
              >
              <SongEnergy currPlaylist={currPlaylist} />
            </Grid>
            <Grid         
              item
              lg={5}
              md={8}
              sm={12}
              style={{ width: '80%' }}
              >
              <SongDanceability currPlaylist={currPlaylist} />
            </Grid>
            <Grid     
              item
              lg={5}
              md={8}
              sm={12}
              style={{ width: '80%', marginBottom: '20px'}}
              >
              <Playlist />
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

// const Search = ({ initSearch, initSearchResults, clearSearch}) => {
//   const [input, setInput] = useState('');

//   const handleInput = (e) => {
//     setInput(e.target.value)
//   }

//   const handleSubmit = (e) => {
//     e.preventDefault();
//     initSearch(input);
//   }

//   const handleClearSearch = () => {
//     clearSearch()
//     setInput('');
//   }

//   const classes = useStyles();
//   console.log('SEARCH RESULTS', initSearchResults)
//   return (
//     <Box width='50%' className={classes.box}>
//       <Paper className={classes.paper}>
//           <form onSubmit={handleSubmit}>
//             <TextField value={input} onChange={handleInput} fullWidth={true} label='Search Spotify'/>
//           </form>
//         <SearchResults results={initSearchResults} />
//         {
//             initSearchResults.length
//             ? <Button onClick={handleClearSearch}>Clear Results<CloseIcon /></Button>
//             : null
//           }
//       </Paper>
//     </Box>
//   )
// }

// const mapStateToProps = (state) => {
//   return {
//     initSearchResults: state.initSearchResults
//   }
// }

// const mapDispatchToProps = { initSearch, clearSearch };

// export default connect(mapStateToProps, mapDispatchToProps)(Search);