// server/server.js

require('dotenv').config();
const express = require('express');
const { TwitterApi } = require('twitter-api-v2');
const cors = require('cors');
const cookieParser = require('cookie-parser');

const app = express();
const port = 3001;

app.use(cors({ origin: 'http://localhost:8080', credentials: true }));
app.use(express.json());
app.use(cookieParser());

app.post('/tweet', async (req, res) => {
  const { tweetContent, accessToken, accessSecret } = req.body;

  if (!tweetContent) {
    return res.status(400).send({ error: 'Tweet content cannot be empty' });
  }

  if (!accessToken || !accessSecret) {
    return res.status(401).send({ error: 'Unauthorized' });
  }

  try {
    const userClient = new TwitterApi({
      appKey: process.env.TWITTER_APP_KEY,
      appSecret: process.env.TWITTER_APP_SECRET,
      accessToken,
      accessSecret,
    });

    const response = await userClient.v2.tweet(tweetContent);
    res.status(200).send({ success: true, response });
  } catch (error) {
    console.error('Error posting tweet:', error);
    res.status(500).send({ error: 'Failed to post tweet' });
  }
});

app.listen(port, () => {
  console.log(`Server running at http://localhost:${port}`);
});
