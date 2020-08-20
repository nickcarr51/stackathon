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

var env = process.env.NODE_ENV

const CALLBACK_URL = env === 'production' ? 'https://diginkey.herokuapp.com/api/callback' : 'http://localhost:3000/api/callback'

const PORT = process.env.PORT || 3000;
const PUBLIC_PATH = path.join(__dirname, '../../public');
const DIST_PATH = path.join(__dirname, '../../dist');

app.use(cookieParser());

app.use(async (req, res, next) => {
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
});

app.use(express.json());
app.use(cors());
app.use(express.static(PUBLIC_PATH));
app.use(express.static(DIST_PATH));

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
})

app.post('/api/initsearchinfo', (req, res) => {
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
})

app.post('/api/gettrack', (req, res) => {
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
})

app.post('/api/getinfo', (req, res) => {
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
})

app.post('/api/getsimilar', (req, res) => {
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
})

app.post('/api/getsimilarinfo', (req, res) => {
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
})

app.post('/api/addtoplaylist', async (req, res) => {
  const { track, trackInfo, currKey } = req.body;
  let camelotKey;
  if (currKey.mode === 0) {
    camelotKey = currKey.camelotPosition + 'A'
  } else {
    camelotKey = currKey.camelotPosition + 'B'
  }
  const song = await Song.create({
    name: track.name,
    id: track.id,
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
})

app.get('/api/getplaylist', async (req, res) => {
  const playlist = await Song.findAll({ where: { sessionId: req.session_id }});
  res.send(playlist);
})

app.delete('/api/deletefromplaylist/:id', async (req, res) => {
  const { id } = req.params;
  await Song.destroy({ where: { id: id, sessionId: req.session_id }});
  res.send(id);
})

app.delete('/api/clearplaylist', async (req, res) => {
  await Song.destroy({ where: { sessionId: req.session_id }});
  res.sendStatus(200);
})

//this is directly from the spotify docs, first time around this does redirect correctly to the spotify login page, then redirects the page to the callback url with the accesstoken in the hash,
//which breaks the page.  I've tried different callback urls, I've double checked the callback url on the developer dashboard, I've modified and tried different routes to get to callback (exact path vs path, etc.)

app.get('/login', (req, res) => {
  console.log(chalk.magenta('HELLO I AM AT LOGIN'));
  const scopes = 'user-read-private user-read-email playlist-modify-public playlist-modify-private playlist-read-private';
  res.redirect('https://accounts.spotify.com/authorize' +
    '?response_type=code' +
    '&client_id=' + process.env.SPOTIFY_KEY +
    (scopes ? '&scope=' + encodeURIComponent(scopes) : '') +
    '&redirect_uri=' + encodeURIComponent(CALLBACK_URL));
});

app.get('/api/callback', (req, res) => {
  console.log(chalk.red('HELLO I AM CALLBACK'));
  // console.log(req.query.code)

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
    redirect_uri: 'http://localhost:3000/api/callback'
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
          console.log(songs);
          axios.post(
            `https://api.spotify.com/v1/playlists/${playlistId}/tracks`,
            {
              "uris": songs,
            }, {
              headers: {
                "Authorization": "Bearer " + accessToken
              }
            }
          ).then(response => {
            console.log(response);
          })

        })

      })
    })
  res.redirect('/');

})

// app.get('*', (req, res) => {
//   res.sendFile(path.join(PUBLIC_PATH, '/index.html'));
// });
app.get('*', (req, res) => {
  res.sendFile(path.join(__dirname, '../../public/index.html'));
});

db.sync()
  .then(() => {
    app.listen(PORT, () => {
      console.log(chalk.greenBright(`Server is now listening on PORT:${PORT}`));
    });
  })

