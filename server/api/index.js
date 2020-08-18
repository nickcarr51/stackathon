require('dotenv').config();
const path = require('path');
const express = require('express');
const chalk = require('chalk');
const cors = require('cors');
const cookieParser = require('cookie-parser');
const app = require('./server');
const axios = require('axios').default;
const qs = require('qs')
const { db, Session, Song } = require('../db/db');

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

// app.post('/api/checkkey', (req, res) => {
//   const { id } = req.body;
//   axios.post(
//     'https://accounts.spotify.com/api/token',
//     qs.stringify(data),
//     headers
//   ).then(response => {
//     const accessToken = response.data.access_token;
//     axios.get(
//       `https://api.spotify.com/v1/audio-features/${id}`,
//       {
//         headers: {
//           "Authorization": "Bearer " + accessToken
//         }
//       }
//     ).then(response => {
//       res.send(response.data);
//     })
//   })
// })

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
  console.log(currKey);
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
    sessionId: req.session_id
  })

  res.send(song);
})

app.get('/api/getplaylist', async (req, res) => {
  const playlist = await Song.findAll({ where: { sessionId: req.session_id }});
  console.log(playlist);
  res.send(playlist);
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

