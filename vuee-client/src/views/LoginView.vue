<template>
  <div>
    <h1>Login</h1>
    <form @submit.prevent="submit">
      <div>
        <label for="email">Email:</label>
        <input type="email" id="email" v-model="email">
      </div>
      <div>
        <label for="password">Password:</label>
        <input type="password" id="password" v-model="password">
      </div>
      <button type="submit">Submit</button>
      <router-link to="/signup">Signup</router-link>
    </form>
  </div>
</template>

<script>
import axios from "axios"
export default {
  data() {
    return {
      email: '',
      password: '',
      error: null
    };
  },
  methods: {
    async submit() {
      try {
        const { data } = await axios.post('http://localhost:5000/api/login-details', { email: this.email, password: this.password });
        console.log(data);
        this.$router.push('/');
      } catch (error) {
        this.error = error.response.data.error;
      }
    }
  },
};
</script>
