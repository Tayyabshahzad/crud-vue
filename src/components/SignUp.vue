<template>
    <div class="signUp-form">
        
        <h2>Sign Up</h2>
        <p v-if="loginMessage">{{ loginMessage }}</p>
        <div class="register">
            <input type="text" v-model="name" placeholder="Name">
            <input type="email" v-model="email" placeholder="Email"> 
            <button v-on:click="signUp">Sign Up</button>
            <p> Already have
                <router-link to="/login">Login</router-link>
            </p>
        </div>
    </div>
</template>

<script>
import axios from 'axios'
export default {
    name: 'SignUp',
    data() {
        return {
            name: '',
            email: '', 
            loginMessage: '' 
        }
    },
    methods: {
    async signUp() {
      console.warn("yes", this.name, this.email, this.password);
      try {
        let result = await axios.post("http://localhost:8000/api/register", {
          name: this.name,
          email: this.email,
        });
        console.log(result);
        if (result.data.status == true) {
          this.loginMessage = result.data.message;
        }
      } catch (error) {
        // Check if the error is due to validation failure (422)
        if (error.response && error.response.status === 422) {
          // Handle validation error
          this.loginMessage = 'This email address is already in use. Please use a different email address.';
        } else {
          // Handle other types of errors
          console.error('Sign up failed:', error);
          this.loginMessage = 'An error occurred during sign up.';
        }
      }
    }
  },
    mounted() {
        
    }
}
</script>

<style>

</style>
