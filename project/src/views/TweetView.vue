<template>
  <div class="tweet-page">
    <h1>Send a Tweet</h1>
    <textarea v-model="tweetContent" placeholder="What's happening?" rows="4"></textarea>
    <button @click="sendTweet">Tweet</button>
    <div v-if="tweets.length > 0">
      <h2>Your Recent Tweets</h2>
      <ul>
        <li v-for="tweet in tweets" :key="tweet.id">{{ tweet.text }}</li>
      </ul>
    </div>
  </div>
</template>

<script>
import axios from 'axios';

export default {
  name: 'TweetPage',
  data() {
    return {
      tweetContent: '',
      tweets: [],
    };
  },
  methods: {
    async sendTweet() {
      if (this.tweetContent.trim() === '') {
        alert('Tweet cannot be empty!');
        return;
      }

      try {
        const response = await axios.post('http://localhost:3001/tweet', {
          tweetContent: this.tweetContent,
          accessToken: localStorage.getItem('access_token'),
          accessSecret: localStorage.getItem('access_secret')
        }, {
          withCredentials: true
        });

        if (response.data.success) {
          alert('Tweet sent successfully!');
          this.tweetContent = '';
        }
      } catch (error) {
        console.error('Error posting tweet:', error);
        alert('Failed to send tweet');
      }
    },

  },
  mounted() {
    // Redirect to home page if the user isn't authenticated
    if (!localStorage.getItem('access_token')) {
      this.$router.push('/');
    } else {
      // Fetch tweets when the component is mounted

    }
  }
};
</script>

<style scoped>
textarea {
  width: 100%;
  padding: 10px;
  font-size: 16px;
}

button {
  margin-top: 10px;
  padding: 10px 20px;
  font-size: 16px;
}

ul {
  list-style: none;
  padding: 0;
}

li {
  margin-bottom: 10px;
  padding: 10px;
  border: 1px solid #ccc;
  border-radius: 5px;
  background-color: #f9f9f9;
}
</style>
