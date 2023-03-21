<template>
    <div>
      <h1>SignUP</h1>
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
      };
    },
    methods: {
      async submit() {
        const { data } = await axios.post('/api/login-details', { email: this.email, password: this.password });
        console.log(data.message);
      },
    },
  };
  </script>
