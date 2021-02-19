import React, { useEffect, useState } from 'react';
import { connect } from 'react-redux';
import { getInfo, getTrack, getSimilar, getPlaylist, addToPlaylist, goBack } from '../../redux/actions';
import { makeStyles } from '@material-ui/core/styles';
import { Paper, Grid, Tabs, Tab, Button, CircularProgress } from '@material-ui/core';
import KeyboardBackspaceIcon from '@material-ui/icons/KeyboardBackspace';
import SearchResults from '../searchFolder/searchResults';
import PlaylistDisplay from '../playlist/playlistDisplay';
import MainTrackContainer from './mainTrackContainer';

const useStyles = makeStyles((theme) => ({
  box: {
    margin: '0 auto',
    height: '600px'
  },
  tab: {
    textTransform: 'none'
  },
}))

const Dig = ({ props, getTrack, getInfo, camelot, getSimilar, getPlaylist, mainTrack, mainTrackInfo, mainKey, harmonicKeys, allSimilar, allSimilarInfo, currPlaylist, addToPlaylist, goBack }) => {
  const [selectedTab, setSelectedTab] = useState(0);

  useEffect(() => {
    window.scroll(0, 0);
  },[])

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

  const handleGoBack = () => {
    goBack(props.history);
  }
  
  const classes = useStyles();

  return (
    <Grid container spacing={0} direction='column' alignItems='center' justify='center' style={{ minHeight: '100vh', paddingTop: '38px' }} >
      {
        mainTrack && mainTrackInfo && mainKey && harmonicKeys.length && allSimilar.length && allSimilarInfo.length 
        ? <Grid item lg={5} md={8} sm={12} style={{ width: '100%' }} >
            <Paper>
              <MainTrackContainer props={props} mainTrack={mainTrack} mainTrackInfo={mainTrackInfo} mainKey={mainKey} harmonicKeys={harmonicKeys} />
              <Tabs centered variant='fullWidth' value={selectedTab} onChange={handleTabChange} >
                {
                  harmonicKeys.map((key, idx) => {
                    return (
                      <Tab className={classes.tab} key={key.name} label={camelot ? `${key.camelotPosition}${key.mode === 0 ? 'A' : 'B'}`: key.name} />
                    )
                  })
                }
              </Tabs>
                {
                  selectedTab === 0 && allSimilarInfo.length && allSimilar.length &&
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
                      }).sort((a, b) => {
                        const aInfo = allSimilarInfo.find(feat => feat.id === a.id)
                        const bInfo = allSimilarInfo.find(feat => feat.id === b.id);
                        const aDiff = Math.abs(aInfo.tempo - mainTrackInfo.tempo)
                        const bDiff = Math.abs(bInfo.tempo - mainTrackInfo.tempo)
                        return aDiff > bDiff ? 1 : -1;
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
                  selectedTab === 1 && allSimilarInfo.length && allSimilar.length && 
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
                      }).sort((a, b) => {
                        const aInfo = allSimilarInfo.find(feat => feat.id === a.id)
                        const bInfo = allSimilarInfo.find(feat => feat.id === b.id);
                        const aDiff = Math.abs(aInfo.tempo - mainTrackInfo.tempo)
                        const bDiff = Math.abs(bInfo.tempo - mainTrackInfo.tempo)
                        return aDiff > bDiff ? 1 : -1;
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
                  selectedTab === 2 && allSimilarInfo.length && allSimilar.length && 
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
                      }).sort((a, b) => {
                        const aInfo = allSimilarInfo.find(feat => feat.id === a.id)
                        const bInfo = allSimilarInfo.find(feat => feat.id === b.id);
                        const aDiff = Math.abs(aInfo.tempo - mainTrackInfo.tempo)
                        const bDiff = Math.abs(bInfo.tempo - mainTrackInfo.tempo)
                        return aDiff > bDiff ? 1 : -1;
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
                  selectedTab === 3 && allSimilarInfo.length && allSimilar.length && 
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
                      }).sort((a, b) => {
                        const aInfo = allSimilarInfo.find(feat => feat.id === a.id)
                        const bInfo = allSimilarInfo.find(feat => feat.id === b.id);
                        const aDiff = Math.abs(aInfo.tempo - mainTrackInfo.tempo)
                        const bDiff = Math.abs(bInfo.tempo - mainTrackInfo.tempo)
                        return aDiff > bDiff ? 1 : -1;
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
              <Button onClick={handleGoBack}><KeyboardBackspaceIcon />Back</Button>
            </Paper>
          </Grid>
        : <Grid className={classes.box} container justify='center' align='flex-start' item lg={5} md={8} sm={12} style={{ width: '100%' }}><CircularProgress /></Grid>
      }
      {
        currPlaylist.length
        ? <PlaylistDisplay currPlaylist={currPlaylist} />
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
    currPlaylist: state.currPlaylist,
    camelot: state.camelot
  }
}

const mapDispatchToProps = { getInfo, getTrack, getSimilar, getPlaylist, addToPlaylist, goBack }

export default connect(mapStateToProps, mapDispatchToProps)(Dig);


// const Dig = ({ props, getTrack, getInfo, camelot, getSimilar, getPlaylist, mainTrack, mainTrackInfo, mainKey, harmonicKeys, allSimilar, allSimilarInfo, currPlaylist, addToPlaylist, goBack }) => {
//   const [selectedTab, setSelectedTab] = useState(0);
//   const [currKey, setCurrKey] = useState({})

//   useEffect(() => {
//     window.scroll(0, 0);
//   },[])

//   useEffect(() => {
//     getTrack(props.match.params.id)
//   },[props.match.params.id]);

//   useEffect(() => {
//     getInfo(props.match.params.id);
//   },[props.match.params.id]);

//   useEffect(() => {
//     getSimilar(props.match.params.id, harmonicKeys);
//   },[props.match.params.id])

//   useEffect(() => {
//     getPlaylist()
//   },[currPlaylist.length])

//   useEffect(() => {
//     setCurrKey(getKey({pitchClass: mainTrackInfo.key, mode: mainTrackInfo.mode }))
//   },[])

//   const handleTabChange = (event, newValue) => {
//     setSelectedTab(newValue);
//   }

//   const handleAdd = (e) => {
//     e.preventDefault();
//     addToPlaylist(mainTrack, mainTrackInfo, mainKey);
//   }

//   const shuffle = () => {
//     getSimilar(props.match.params.id, harmonicKeys);
//   }

//   const handleGoBack = () => {
//     goBack(props.history);
//   }
  
//   const classes = useStyles();

//   return (
//     <Grid container spacing={0} direction='column' alignItems='center' justify='center' style={{ minHeight: '100vh', marginTop: '40px' }} >
//       {
//         mainTrack && mainTrackInfo && mainKey && harmonicKeys.length && allSimilar.length && allSimilarInfo.length 
//         ? <Grid item lg={5} md={8} sm={12} style={{ width: '100%' }} >
//             <Paper>
//               <Grid className={classes.songGrid} container justify='space-between'>
//                 <Grid className={classes.topRow} item container direction='row' justifycontent='space-apart' xs={12}>
//                   <Grid container item direction='column' xs={9}>
//                     <Typography variant='subtitle1'>{mainTrack.artists.map(artist => artist.name).join(', ')}</Typography>
//                       <Typography className={classes.trackName}>{truncateSixty(mainTrack.name)}</Typography>
//                   </Grid>
//                   <Grid container item direction='row' justify='space-evenly' alignitems='center' xs={3}>
//                     <ShuffleIcon className='icon' onClick={shuffle} />
//                     <PlaylistAddIcon className='icon' onClick={handleAdd} />
//                   </Grid>
//                 </Grid>
//                 <Grid className={classes.bottomRow} container item direction='row' justify='space-between' xs={12}>
//                   <Grid container item xs={12} sm={12} md={6} lg={6}>
//                     <div style={{padding: '10px'}}>
//                       <SpotifyPlayer uri={mainTrack.uri} size='compact' view='coverart' theme='white' />
//                     </div>
//                   </Grid>
//                   <Grid container item direction='row' xs={12} sm={12} md={6} lg={6}>
//                     <Grid container item direction='column' justify='space-evenly' xs={6}>
//                       <Typography className={classes.tempoKey} variant='h6'>{camelot ? `${mainKey.camelotPosition}${mainKey.mode === 0 ? 'A' : 'B'}`: mainKey.name}</Typography>
//                       <Typography className={classes.tempoKey} variant='subtitle1'>Energy:{' '}{ Math.floor(mainTrackInfo.energy * 100)}</Typography>
//                     </Grid>
//                     <Grid container item direction='column' justify='space-evenly' xs={6}>
//                       <Typography className={classes.tempoKey} variant='h6'>{ Math.floor(mainTrackInfo.tempo)}{' '}BPM</Typography>
//                       <Typography className={classes.tempoKey} variant='subtitle1'>Danceability:{' '}{ Math.floor(mainTrackInfo.danceability * 100)}</Typography>
//                     </Grid>
//                   </Grid>
//                 </Grid>
//               </Grid>
//               <Tabs centered variant='fullWidth' value={selectedTab} onChange={handleTabChange} >
//                 {
//                   harmonicKeys.map((key, idx) => {
//                     return (
//                       <Tab className={classes.tab} key={key.name} label={camelot ? `${key.camelotPosition}${key.mode === 0 ? 'A' : 'B'}`: key.name} />
//                     )
//                   })
//                 }
//               </Tabs>
//                 {
//                   selectedTab === 0 && allSimilarInfo.length && allSimilar.length &&
//                   <SearchResults 
//                     results={
//                       allSimilar.filter(track => {
//                         const audioFeatures = allSimilarInfo.find(feat => feat.id === track.id);
//                         const key = harmonicKeys[0];
//                         if (audioFeatures && key) {
//                           if (audioFeatures.key === key.pitchClass && audioFeatures.mode === key.mode) {
//                             return track;
//                           }
//                         }
//                       }).sort((a, b) => {
//                         const aInfo = allSimilarInfo.find(feat => feat.id === a.id)
//                         const bInfo = allSimilarInfo.find(feat => feat.id === b.id);
//                         const aDiff = Math.abs(aInfo.tempo - mainTrackInfo.tempo)
//                         const bDiff = Math.abs(bInfo.tempo - mainTrackInfo.tempo)
//                         return aDiff > bDiff ? 1 : -1;
//                       })
//                     }
//                     resultsInfo={
//                       allSimilarInfo.filter(info => {
//                         const key = harmonicKeys[0];
//                         if (info.key === key.pitchClass && info.mode === key.mode) {
//                           return info;
//                         }
//                       })
//                     }
//                   />
//                 }
//                 {
//                   selectedTab === 1 && allSimilarInfo.length && allSimilar.length && 
//                   <SearchResults 
//                     results={
//                       allSimilar.filter(track => {
//                         const audioFeatures = allSimilarInfo.find(feat => feat.id === track.id);
//                         const key = harmonicKeys[1];
//                         if (audioFeatures && key) {
//                           if (audioFeatures.key === key.pitchClass && audioFeatures.mode === key.mode) {
//                             return track;
//                           }
//                         }
//                       }).sort((a, b) => {
//                         const aInfo = allSimilarInfo.find(feat => feat.id === a.id)
//                         const bInfo = allSimilarInfo.find(feat => feat.id === b.id);
//                         const aDiff = Math.abs(aInfo.tempo - mainTrackInfo.tempo)
//                         const bDiff = Math.abs(bInfo.tempo - mainTrackInfo.tempo)
//                         return aDiff > bDiff ? 1 : -1;
//                       })
//                     }
//                     resultsInfo={
//                       allSimilarInfo.filter(info => {
//                         const key = harmonicKeys[1];
//                         if (info.key === key.pitchClass && info.mode === key.mode) {
//                           return info;
//                         }
//                       })
//                     }
//                   />
//                 }
//                 {
//                   selectedTab === 2 && allSimilarInfo.length && allSimilar.length && 
//                   <SearchResults 
//                     results={
//                       allSimilar.filter(track => {
//                         const audioFeatures = allSimilarInfo.find(feat => feat.id === track.id);
//                         const key = harmonicKeys[2];
//                         if (audioFeatures && key) {
//                           if (audioFeatures.key === key.pitchClass && audioFeatures.mode === key.mode) {
//                             return track;
//                           }
//                         }
//                       }).sort((a, b) => {
//                         const aInfo = allSimilarInfo.find(feat => feat.id === a.id)
//                         const bInfo = allSimilarInfo.find(feat => feat.id === b.id);
//                         const aDiff = Math.abs(aInfo.tempo - mainTrackInfo.tempo)
//                         const bDiff = Math.abs(bInfo.tempo - mainTrackInfo.tempo)
//                         return aDiff > bDiff ? 1 : -1;
//                       })
//                     }
//                     resultsInfo={
//                       allSimilarInfo.filter(info => {
//                         const key = harmonicKeys[2];
//                         if (info.key === key.pitchClass && info.mode === key.mode) {
//                           return info;
//                         }
//                       })
//                     }
//                   />
//                 }
//                 {
//                   selectedTab === 3 && allSimilarInfo.length && allSimilar.length && 
//                   <SearchResults 
//                     results={
//                       allSimilar.filter(track => {
//                         const audioFeatures = allSimilarInfo.find(feat => feat.id === track.id);
//                         const key = harmonicKeys[3];
//                         if (audioFeatures && key) {
//                           if (audioFeatures.key === key.pitchClass && audioFeatures.mode === key.mode) {
//                             return track;
//                           }
//                         }
//                       }).sort((a, b) => {
//                         const aInfo = allSimilarInfo.find(feat => feat.id === a.id)
//                         const bInfo = allSimilarInfo.find(feat => feat.id === b.id);
//                         const aDiff = Math.abs(aInfo.tempo - mainTrackInfo.tempo)
//                         const bDiff = Math.abs(bInfo.tempo - mainTrackInfo.tempo)
//                         return aDiff > bDiff ? 1 : -1;
//                       })
//                     }
//                     resultsInfo={
//                       allSimilarInfo.filter(info => {
//                         const key = harmonicKeys[3];
//                         if (info.key === key.pitchClass && info.mode === key.mode) {
//                           return info;
//                         }
//                       })
//                     }
//                   />
//                 }
//               <Button onClick={handleGoBack}><KeyboardBackspaceIcon />Back</Button>
//             </Paper>
//           </Grid>
//         : <Grid className={classes.box} container justify='center' align='flex-start' item lg={5} md={8} sm={12} style={{ width: '100%' }}><CircularProgress /></Grid>
//       }
//       {
//         currPlaylist.length
//         ? <Grid container direction='column' alignItems='center' justify='center'>
//             <Grid     
//               item
//               lg={5}
//               md={8}
//               sm={12}
//               style={{ width: '100%', margin: '10px 0px'}}
//               >
//               <Accordion>
//                 <AccordionSummary expandIcon={<ExpandMoreIcon />}>
//                   <Typography>Playlist</Typography>
//                 </AccordionSummary>
//                 <AccordionDetails>
//                   <Playlist />
//                 </AccordionDetails>
//               </Accordion>
//             </Grid>
//             <Grid item lg={5} md={8} sm={12} style={{ width: '100%', margin: '10px 0px' }} >
//               <Accordion>
//                 <AccordionSummary expandIcon={<ExpandMoreIcon />}>
//                   <Typography>Insights</Typography>
//                 </AccordionSummary>
//                 <AccordionDetails>
//                   <Grid container direction='column'>
//                     <Typography variant='h5'>Tempo</Typography>
//                     <SongTempo currPlaylist={currPlaylist} />
//                     <Typography variant='h5'>Energy</Typography>
//                     <SongEnergy currPlaylist={currPlaylist} />
//                     <Typography variant='h5'>Danceability</Typography>
//                     <SongDanceability currPlaylist={currPlaylist} />
//                   </Grid>
//                 </AccordionDetails>
//               </Accordion>
//             </Grid>
//             <Grid container justify='center' style={{marginBottom: '20px'}}>
//               <a className='spotifyButton' href='/login'><Button className={classes.button}>Create Playlist<img className='spotifyIcon' src={Spotify_Icon_CMYK_White} /></Button></a>
//             </Grid>
//           </Grid>
//         : null
//       }
//     </Grid>
//   )
// }
// const mapStateToProps = state => {
//   return {
//     mainTrack: state.mainTrack,
//     mainTrackInfo: state.mainTrackInfo,
//     mainKey: state.mainKey,
//     harmonicKeys: state.harmonicKeys,
//     allSimilar: state.allSimilar,
//     allSimilarInfo: state.allSimilarInfo,
//     currPlaylist: state.currPlaylist,
//     camelot: state.camelot
//   }
// }

// const mapDispatchToProps = { getInfo, getTrack, getSimilar, getPlaylist, addToPlaylist, goBack }

// export default connect(mapStateToProps, mapDispatchToProps)(Dig);