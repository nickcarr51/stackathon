require('dotenv').config();
const path = require('path');
const express = require('express');
const chalk = require('chalk');
const app = require('./server');
const axios = require('axios').default;
const qs = require('qs')

const PORT = process.env.PORT || 3000;
const PUBLIC_PATH = path.join(__dirname, '../../public');
const DIST_PATH = path.join(__dirname, '../../dist');

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

app.post('/api/initsearch', async (req, res) => {
  const { input } = req.body;
  await axios.post(
    'https://accounts.spotify.com/api/token',
    qs.stringify(data),
    headers
  ).then(async response => {
    const accessToken = response.data.access_token;
    await axios.get(
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

app.get('*', (req, res) => {
  res.sendFile(path.join(PUBLIC_PATH, './index.html'));
});

app.listen(PORT, () => {
  console.log(chalk.greenBright(`Server is now listening on PORT:${PORT}`));
});
