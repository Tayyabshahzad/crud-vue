<template>
  <router-view />
</template>

<script>
export default {
  name: 'App',
}
</script>

<style>
#app {
  font-family: Avenir, Helvetica, Arial, sans-serif;
  -webkit-font-smoothing: antialiased;
  -moz-osx-font-smoothing: grayscale;
  text-align: center;
  color: #2c3e50;
}
body{
  padding: 0;
  margin: 0;
}
.signUp-form, .login-form, .add-form {
  margin-top: 60px;
    border: 1px solid skyblue;
    width: 320px;
    border-radius: 10px;
    box-shadow: 1px 1px 1px 1px rgba(102, 101, 101, 0.2);
    background-color: rgb(230, 225, 225);
    margin-left: auto;
    margin-right: auto;
    padding: 20px;
}

.logo {
    height: 120px;
}

.register input, .login input, .add input {
    width: 300px;
    height: 30px;
    padding: 3px;
    text-align: center;
    border-radius: 10px;
    display: block;
    margin-bottom: 10px;
    margin-left: auto;
    margin-right: auto;
    border: 1px solid skyblue;
}

.register button, .login button, .add button {
    width: 300px;
    height: 40px;
    color: white;
    border-radius: 10px;
    border: 1px solid skyblue;
    background-color: skyblue;
}
</style>
