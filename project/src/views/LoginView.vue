<template>
  <div class="home">
    <h1>Login with Twitter</h1>
    <button @click="signInWithTwitter">Login with Twitter</button>
  </div>
</template>

<script>
import { auth, signInWithPopup } from '@/firebaseConfig';
import { TwitterAuthProvider } from 'firebase/auth';  // Import TwitterAuthProvider from firebase/auth

export default {
  name: 'LoginView',
  methods: {
    async signInWithTwitter() {
      try {
        
        const provider = new TwitterAuthProvider();  // Use new TwitterAuthProvider in a modular way
        const result = await signInWithPopup(auth, provider);
        const credential = TwitterAuthProvider.credentialFromResult(result);
        const token = credential.accessToken;
        const secret = credential.secret;
        console.log(result)
        const user = result.user;

        // Store the user data in local storage or use Firebase Firestore for persistence
        localStorage.setItem('access_token', token);
        localStorage.setItem('access_secret', secret);
        localStorage.setItem('user', JSON.stringify(user));

        // Redirect to the tweet page
        this.$router.push('/tweet');
      } catch (error) {
        console.error('Error during sign in:', error);
      }
    }
  }
};
</script>

<style scoped>
button {
  padding: 10px;
  font-size: 16px;
}
</style>
