require('dotenv').config();
const path = require('path');
const express = require('express');
const chalk = require('chalk');
const cors = require('cors');
const cookieParser = require('cookie-parser');
const app = require('./server');
const axios = require('axios').default;
const moment = require('moment');
const qs = require('qs')
const { db, Session, Song } = require('../db/db');

const PORT = process.env.PORT || 3000;
const PUBLIC_PATH = path.join(__dirname, '../../public');
const DIST_PATH = path.join(__dirname, '../../dist');

app.use(express.json());
app.use(cors());
app.use(express.static(PUBLIC_PATH));
app.use(express.static(DIST_PATH));

app.use(cookieParser());

app.use(async (req, res, next) => {
  try {
    if (!req.cookies.session_id) {
      const session = await Session.create();
  
      const oneWeek = 1000 * 60 * 60 * 24 * 7;
  
      res.cookie('session_id', session.id, {
        path: '/',
        expires: new Date(Date.now() + oneWeek),
      });
  
      req.session_id = session.id;
  
      next();
    } else {
      req.session_id = req.cookies.session_id;
  
      next();
    }
  } catch (e) {
    next(e);
  }
});


const headers = {
  headers: {
    Accept: 'application/json',
    'Content-Type': 'application/x-www-form-urlencoded',
  },
  auth: {
    username: process.env.SPOTIFY_KEY,
    password: process.env.SPOTIFY_SECRET,
  },
};
const data = {
  grant_type: 'client_credentials',
};

app.post('/api/initsearch', (req, res) => {
  try {
    const { input } = req.body;
    axios.post(
      'https://accounts.spotify.com/api/token',
      qs.stringify(data),
      headers
    ).then(response => {
      const accessToken = response.data.access_token;
      axios.get(
        `https://api.spotify.com/v1/search?q=${ encodeURI(input) }&type=track`,
        {
          headers: {
              "Authorization": "Bearer " + accessToken
          }
        }
      ).then(response => {
        res.send(response.data.tracks.items);
      })  
    })
    .catch(e => next(e));
  } catch (e) {
    console.log(e);
  }
})

app.post('/api/initsearchinfo', (req, res, next) => {
  try {
    const { ids } = req.body;
    axios.post(
      'https://accounts.spotify.com/api/token',
      qs.stringify(data),
      headers
    ).then(response => {
      const accessToken = response.data.access_token;
      axios.get(
        `https://api.spotify.com/v1/audio-features/?ids=${ids}`,
        {
          headers: {
            "Authorization": "Bearer " + accessToken
          }
        }
      ).then(response => {
        res.send(response.data.audio_features);
      })
    })
    .catch(e => next(e))
  } catch(e) {
    next(e);
  }
})

app.post('/api/gettrack', (req, res, next) => {
  try {
    const { id } = req.body;
    axios.post(
      'https://accounts.spotify.com/api/token',
      qs.stringify(data),
      headers
    ).then(response => {
      const accessToken = response.data.access_token;
      axios.get(
        `https://api.spotify.com/v1/tracks/${id}`,
        {
          headers: {
            "Authorization": "Bearer " + accessToken
          }
        }
      ).then(response => {
        res.send(response.data);
      })
    })
    .catch(e => next(e))
  } catch (e) {
    next(e);
  }
})

app.post('/api/getinfo', (req, res, next) => {
  try {
    const { id } = req.body;
    axios.post(
      'https://accounts.spotify.com/api/token',
      qs.stringify(data),
      headers
    ).then(response => {
      const accessToken = response.data.access_token;
      axios.get(
        `https://api.spotify.com/v1/audio-features/${id}`,
        {
          headers: {
            "Authorization": "Bearer " + accessToken
          }
        }
      ).then(response => {
        res.send(response.data);
      })
    })
    .catch(e => next(e))
  } catch(e) {
    next(e);
  }
})

app.post('/api/getsimilar', (req, res, next) => {
  try {
    const { id } = req.body;
    axios.post(
      'https://accounts.spotify.com/api/token',
      qs.stringify(data),
      headers
    ).then(response => {
      const accessToken = response.data.access_token;
      axios.get(
        `https://api.spotify.com/v1/recommendations?limit=100&seed_tracks=${id}`,
        {
          headers: {
            "Authorization": "Bearer " + accessToken
          }
        }
      ).then(response => {
        res.send(response.data.tracks);
      })
    })
    .catch(e => next(e))
  } catch(e) {
    next(e);
  }
})

app.post('/api/getsimilarinfo', (req, res, next) => {
  try {
    const { ids } = req.body;
    axios.post(
      'https://accounts.spotify.com/api/token',
      qs.stringify(data),
      headers
    ).then(response => {
      const accessToken = response.data.access_token
      axios.get(
        `https://api.spotify.com/v1/audio-features/?ids=${ids}`,
        {
          headers: {
            "Authorization": "Bearer " + accessToken
          }
        }
      ).then(response => {
        res.send(response.data.audio_features);
      })
    })
    .catch(e => next(e))
  } catch(e) {
    next(e);
  } 
})

app.post('/api/addtoplaylist', async (req, res, next) => {
  try {
    const { track, trackInfo, currKey } = req.body;
    let camelotKey;
    if (currKey.mode === 0) {
      camelotKey = currKey.camelotPosition + 'A'
    } else {
      camelotKey = currKey.camelotPosition + 'B'
    }
    const song = await Song.create({
      name: track.name,
      songId: track.id,
      artists: track.artists.map(artist => artist.name),
      energy: trackInfo.energy,
      danceability: trackInfo.danceability,
      key: currKey.name,
      camelotKey: camelotKey,
      tempo: Math.floor(trackInfo.tempo),
      uri: track.uri,
      sessionId: req.session_id
    })
  
    res.send(song);
  } catch(e) {
    next(e);
  }
})

app.get('/api/getplaylist', async (req, res, next) => {
  try {
    const playlist = await Song.findAll({ where: { sessionId: req.session_id }});
    res.send(playlist);
  } catch(e) {
    next(e);
  }
})

app.delete('/api/deletefromplaylist/:id', async (req, res, next) => {
  try {
    const { id } = req.params;
    await Song.destroy({ where: { songId: id, sessionId: req.session_id }});
    res.send(id);
  } catch(e) {
    next(e);
  }
})

app.delete('/api/clearplaylist', async (req, res, next) => {
  try {
    await Song.destroy({ where: { sessionId: req.session_id }});
    res.sendStatus(200);
  } catch(e) {
    next(e);
  }
})


app.get('/login', (req, res, next) => {
  try {
    const scopes = 'user-read-private user-read-email playlist-modify-public playlist-modify-private playlist-read-private';
    res.redirect('https://accounts.spotify.com/authorize' +
      '?response_type=code' +
      '&client_id=' + process.env.SPOTIFY_KEY +
      (scopes ? '&scope=' + encodeURIComponent(scopes) : '') +
      '&redirect_uri=' + encodeURIComponent('https://diginkey.herokuapp.com/api/callback'));
      // '&redirect_uri=' + encodeURIComponent('http://localhost:3000/api/callback'));
  } catch(e) {
    next(e);
  }
});

app.get('/api/callback', (req, res) => {
  try {
    const headers = {
      headers: {
        Accept: 'application/json',
        'Content-Type': 'application/x-www-form-urlencoded',
      },
      auth: {
        username: process.env.SPOTIFY_KEY,
        password: process.env.SPOTIFY_SECRET,
      },
    };
    const body = {
      grant_type: 'authorization_code',
      code: req.query.code,
      redirect_uri: 'https://diginkey.herokuapp.com/api/callback',
      // redirect_uri: 'http://localhost:3000/api/callback',
    };
  
      axios.post(
        'https://accounts.spotify.com/api/token',
        qs.stringify(body),
        headers
      ).then(response => {
        const accessToken = response.data.access_token;
        axios.get(
          'https://api.spotify.com/v1/me',
          {
            headers: {
              "Authorization": "Bearer " + accessToken
            }
          }
        ).then(response => {
          const userId = response.data.id;
          axios.post(
            `https://api.spotify.com/v1/users/${userId}/playlists`,
            {
              name: `digInKey Playlist ${moment().format('MM/DD/YYYY')}`,
              description: 'A harmonically compatbile playlist made with digInKey'
              
            }, {
              headers: {
                "Authorization": "Bearer " + accessToken
              }
            }
          ).then(async response => {
            const playlistId = response.data.id;
            let songs = await Song.findAll({where: { sessionId: req.session_id }, raw: true})
            songs = songs.map(song => song.uri)
            axios.post(
              `https://api.spotify.com/v1/playlists/${playlistId}/tracks`,
              {
                "uris": songs,
              }, {
                headers: {
                  "Authorization": "Bearer " + accessToken
                }
              }
            ).then(async response => {
              await Song.destroy({ where: { sessionId: req.session_id }});
              
            })
  
          })
  
        })
      })
      .catch(e => next(e))
      res.redirect('/#/playlistcreated');
  } catch (e) {
    res.redirect('/#/playlisterror')
  }


})

app.post('/api/sendhome', (req, res, next) => {
  try {
    res.redirect('/');
  } catch(e) {
    next(e);
  }
})

app.get('*', (req, res, next) => {
  try {
    res.sendFile(path.join(__dirname, '../../public/index.html'));
  } catch(e) {
    next(e);
  }
});

app.use((err, req, res, next) => {
  console.error(err)
  console.error(err.stack)
  res.status(err.status || 500).send(err.message || 'Internal server error.')
})

app.listen(PORT, () => {
  console.log(chalk.greenBright(`Server is now listening on PORT:${PORT}`));
});

