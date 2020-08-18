import React, { useEffect, useState } from 'react';
import { connect } from 'react-redux';
import { getInfo, getTrack, getSimilar, getPlaylist } from '../../redux/actions';
import { makeStyles } from '@material-ui/core/styles';
import { Box, Paper, Grid, Tabs, Tab, Button, Typography } from '@material-ui/core';
import SearchResults from '../search/searchResults';
import Playlist from '../playlist/playlist';
import SpotifyPlayer from 'react-spotify-player';
import SongEnergy from '../songEnergyChart/songEnergy';
import SongDanceability from '../songEnergyChart/danceabilityChart';

const useStyles = makeStyles((theme) => ({
  paper: {
    // marginTop: theme.spacing(3),
    // marginBotom: theme.spacing(3),
    // padding: theme.spacing(4),
    // display: 'flex',
    // flexDirection: 'column',
    // height: '600px'
  },
  box: {
    margin: '0 auto',
    height: '600px'
  },
  tab: {
    textTransform: 'none'
  },
  mainTrackContainer: {
    padding: '10px'
  }
}))

const Dig = ({ props, getTrack, getInfo, getSimilar, getPlaylist, mainTrack, mainTrackInfo, mainKey, harmonicKeys, allSimilar, allSimilarInfo, currPlaylist }) => {
  const [selectedTab, setSelectedTab] = useState(0);

  useEffect(() => {
    getTrack(props.match.params.id)
  },[props.match.params.id]);

  useEffect(() => {
    getInfo(props.match.params.id);
  },[props.match.params.id]);

  useEffect(() => {
    getSimilar(props.match.params.id, harmonicKeys);
  },[props.match.params.id])

  useEffect(() => {
    getPlaylist()
  },[currPlaylist.length])

  const handleTabChange = (event, newValue) => {
    setSelectedTab(newValue);
  }
  
  const classes = useStyles();
  console.log(props);
  console.log('MAIN TRACK', mainTrack);
  console.log('MAIN TRACK INFO', mainTrackInfo);
  console.log('MAIN KEY', mainKey);
  console.log('HARMONIC KEYS', harmonicKeys);
  console.log('SIMILAR TRACKS', allSimilar)
  console.log('SIMILAR TRACK INFO', allSimilarInfo)
  return (
    <Grid
      container
      spacing={0}
      direction='column'
      alignItems='center'
      justify='center'
      style={{ minHeight: '100vh' }}
    >
      {mainTrack && mainTrackInfo && mainKey && harmonicKeys.length && allSimilar.length && allSimilarInfo.length && 
        <Grid
        item
        lg={5}
        md={8}
        sm={12}
        style={{ width: '80%' }}
      >
        <Paper className={classes.paper}>
        <Grid className={classes.mainTrackContainer} container spacing={3}>
          <Grid item xs={10}>
            <Typography variant='h6'>{mainTrack.artists.map(artist => artist.name).join(', ')}</Typography>
            <Typography variant='h4'>{mainTrack.name}</Typography>
            <div>
              <SpotifyPlayer uri={mainTrack.uri} size='compact' view='coverart' theme='white' />
            </div>
          </Grid>
          <Grid container item direction='column' justify='space-between' xs={2}>
            <Typography variant='h6'>{ mainKey.name }/{mainKey.camelotPosition}{mainKey.mode === 0 ? 'A' : 'B'}</Typography>
            <Typography variant='h6'>{ Math.floor(mainTrackInfo.tempo)}{' '}BPM</Typography>
          </Grid>
        </Grid>
          <Tabs
            centered
            variant='fullWidth'
            value={selectedTab}
            onChange={handleTabChange}
          >
            {
              harmonicKeys.map((key, idx) => {
                return (
                  <Tab className={classes.tab} key={key.name} label={key.name} />
                )
              })
            }
          </Tabs>
            {
              selectedTab === 0 && allSimilarInfo.length && allSimilar.length  && 
              <SearchResults 
                results={
                  allSimilar.filter(track => {
                    const audioFeatures = allSimilarInfo.find(feat => feat.id === track.id);
                    const key = harmonicKeys[0];
                    if (audioFeatures && key) {
                      if (audioFeatures.key === key.pitchClass && audioFeatures.mode === key.mode) {
                        return track;
                      }
                    }
                  })
                }
                resultsInfo={
                  allSimilarInfo.filter(info => {
                    const key = harmonicKeys[0];
                    if (info.key === key.pitchClass && info.mode === key.mode) {
                      return info;
                    }
                  })
                }
              />
            }
            {
              selectedTab === 1 && allSimilarInfo.length && allSimilar.length  && 
              <SearchResults 
                results={
                  allSimilar.filter(track => {
                    const audioFeatures = allSimilarInfo.find(feat => feat.id === track.id);
                    const key = harmonicKeys[1];
                    if (audioFeatures && key) {
                      if (audioFeatures.key === key.pitchClass && audioFeatures.mode === key.mode) {
                        return track;
                      }
                    }
                  })
                }
                resultsInfo={
                  allSimilarInfo.filter(info => {
                    const key = harmonicKeys[1];
                    if (info.key === key.pitchClass && info.mode === key.mode) {
                      return info;
                    }
                  })
                }
              />
            }
            {
              selectedTab === 2 && allSimilarInfo.length && allSimilar.length  && 
              <SearchResults 
                results={
                  allSimilar.filter(track => {
                    const audioFeatures = allSimilarInfo.find(feat => feat.id === track.id);
                    const key = harmonicKeys[2];
                    if (audioFeatures && key) {
                      if (audioFeatures.key === key.pitchClass && audioFeatures.mode === key.mode) {
                        return track;
                      }
                    }
                  })
                }
                resultsInfo={
                  allSimilarInfo.filter(info => {
                    const key = harmonicKeys[2];
                    if (info.key === key.pitchClass && info.mode === key.mode) {
                      return info;
                    }
                  })
                }
              />
            }
            {
              selectedTab === 3 && allSimilarInfo.length && allSimilar.length  && 
              <SearchResults 
                results={
                  allSimilar.filter(track => {
                    const audioFeatures = allSimilarInfo.find(feat => feat.id === track.id);
                    const key = harmonicKeys[3];
                    if (audioFeatures && key) {
                      if (audioFeatures.key === key.pitchClass && audioFeatures.mode === key.mode) {
                        return track;
                      }
                    }
                  })
                }
                resultsInfo={
                  allSimilarInfo.filter(info => {
                    const key = harmonicKeys[3];
                    if (info.key === key.pitchClass && info.mode === key.mode) {
                      return info;
                    }
                  })
                }
              />
            }
        <Button onClick={() => props.history.push('/')}>Back</Button>
      </Paper>
      </Grid>
      }
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
const mapStateToProps = state => {
  return {
    mainTrack: state.mainTrack,
    mainTrackInfo: state.mainTrackInfo,
    mainKey: state.mainKey,
    harmonicKeys: state.harmonicKeys,
    allSimilar: state.allSimilar,
    allSimilarInfo: state.allSimilarInfo,
    currPlaylist: state.currPlaylist
  }
}

const mapDispatchToProps = { getInfo, getTrack, getSimilar, getPlaylist }

export default connect(mapStateToProps, mapDispatchToProps)(Dig);


// const Dig = ({ props, getTrack, getInfo, getSimilar, mainTrack, mainTrackInfo, mainKey, harmonicKeys, allSimilar, allSimilarInfo }) => {
//   const [selectedTab, setSelectedTab] = useState(0);

//   useEffect(() => {
//     getTrack(props.match.params.id)
//   },[props.match.params.id]);

//   useEffect(() => {
//     getInfo(props.match.params.id);
//   },[props.match.params.id]);

//   useEffect(() => {
//     getSimilar(props.match.params.id, harmonicKeys);
//   },[props.match.params.id])

//   const handleTabChange = (event, newValue) => {
//     setSelectedTab(newValue);
//   }
  
//   const classes = useStyles();
//   console.log(props);
//   console.log('MAIN TRACK', mainTrack);
//   console.log('MAIN TRACK INFO', mainTrackInfo);
//   console.log('MAIN KEY', mainKey);
//   console.log('HARMONIC KEYS', harmonicKeys);
//   console.log('SIMILAR TRACKS', allSimilar)
//   console.log('SIMILAR TRACK INFO', allSimilarInfo)
//   return (
//     <Box width='50%' className={classes.box}>
//       <Paper className={classes.paper}>
//         <Grid container spacing={3}>
//           <Grid item xs={12}>
//             <h1>{mainTrack.name}</h1>
//           </Grid>
//           <Grid item xs={6}>
//             <h2>{ mainKey.name }/{mainKey.camelotPosition}{mainKey.mode === 0 ? 'A' : 'B'}</h2>
//           </Grid>
//           <Grid item xs={6}>
//             <h2>{ Math.floor(mainTrackInfo.tempo)}{' '}BPM</h2>
//           </Grid>
//         </Grid>
//           <Tabs
//             value={selectedTab}
//             onChange={handleTabChange}
//           >
//             {
//               harmonicKeys.map((key, idx) => {
//                 return (
//                   <Tab className={classes.tab} key={key.name} label={key.name} />
//                 )
//               })
//             }
//           </Tabs>
//             {
//               selectedTab === 0 && allSimilarInfo.length && allSimilar.length  && 
//               <SearchResults 
//                 results={
//                   allSimilar.filter(track => {
//                     const audioFeatures = allSimilarInfo.find(feat => feat.id === track.id);
//                     const key = harmonicKeys[0];
//                     if (audioFeatures && key) {
//                       if (audioFeatures.key === key.pitchClass && audioFeatures.mode === key.mode) {
//                         return track;
//                       }
//                     }
//                   })
//                 }
//               />
//             }
//             {
//               selectedTab === 1 && allSimilarInfo.length && allSimilar.length  && 
//               <SearchResults 
//                 results={
//                   allSimilar.filter(track => {
//                     const audioFeatures = allSimilarInfo.find(feat => feat.id === track.id);
//                     const key = harmonicKeys[1];
//                     if (audioFeatures && key) {
//                       if (audioFeatures.key === key.pitchClass && audioFeatures.mode === key.mode) {
//                         return track;
//                       }
//                     }
//                   })
//                 }
//               />
//             }
//             {
//               selectedTab === 2 && allSimilarInfo.length && allSimilar.length  && 
//               <SearchResults 
//                 results={
//                   allSimilar.filter(track => {
//                     const audioFeatures = allSimilarInfo.find(feat => feat.id === track.id);
//                     const key = harmonicKeys[2];
//                     if (audioFeatures && key) {
//                       if (audioFeatures.key === key.pitchClass && audioFeatures.mode === key.mode) {
//                         return track;
//                       }
//                     }
//                   })
//                 }
//               />
//             }
//             {
//               selectedTab === 3 && allSimilarInfo.length && allSimilar.length  && 
//               <SearchResults 
//                 results={
//                   allSimilar.filter(track => {
//                     const audioFeatures = allSimilarInfo.find(feat => feat.id === track.id);
//                     const key = harmonicKeys[3];
//                     if (audioFeatures && key) {
//                       if (audioFeatures.key === key.pitchClass && audioFeatures.mode === key.mode) {
//                         return track;
//                       }
//                     }
//                   })
//                 }
//               />
//             }
//         <Button onClick={() => props.history.push('/')}>Back</Button>
//       </Paper>
//     </Box>
//   )
// }
// const mapStateToProps = state => {
//   return {
//     mainTrack: state.mainTrack,
//     mainTrackInfo: state.mainTrackInfo,
//     mainKey: state.mainKey,
//     harmonicKeys: state.harmonicKeys,
//     allSimilar: state.allSimilar,
//     allSimilarInfo: state.allSimilarInfo
//   }
// }

// const mapDispatchToProps = { getInfo, getTrack, getSimilar }

// export default connect(mapStateToProps, mapDispatchToProps)(Dig);