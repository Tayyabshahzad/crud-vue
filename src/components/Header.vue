<template>
<div class="nav">
    
    <router-link to="/add">Add Restaurent</router-link>
    <a v-on:click="logout" href="">Logout</a>
</div>
</template>

<script>
export default {
    name: "AppHeader",
    methods: {
        logout() {
            localStorage.clear();
            this.$router.push({
                name: "Login"
            });
        },
    },
};
</script>

<style>
.nav {
    background-color: rgb(56, 29, 29);
    overflow: hidden;
}

.nav a {
    float: left;
    text-align: center;
    padding: 16px 14px;
    color: white;
    font-size: 16px;
    text-decoration: none;
    margin-left: 1px;
}

.nav a:hover {
    background: wheat;
    color: black;
}
</style>
