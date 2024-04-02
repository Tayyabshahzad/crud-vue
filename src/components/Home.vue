<template lang="">
<div>
    <Header />
    <h1>Hello {{name}}, Welcome To Home</h1>

    <h1>All Restaurants</h1>
    <table id="customers">
        <tr>
            <td>ID</td>
            <td>Name</td>
            <td>Address</td>
            <td>Contact</td>
            <td>Action</td>
        </tr>
        <tr v-for="item in restaurants" :key="item.id">
            <td>{{item.id}}</td>
            <td>{{item.name}}</td>
            <td>{{item.address}}</td>
            <td>{{item.contact}}</td>
            <td>
                <router-link :to="'/update/'+item.id">Update</router-link>
                <button v-on:click="deleteRestaurant(item.id)">Delete</button>
            </td>
        </tr>
    </table>
</div>
</template>

<script>
import axios from 'axios';
import Header from './Header.vue';
export default {
    name: "HomePage",
    data() {
        return {
            name: '',
            restaurants: [],
        }
    },
    components: {
        Header
    },
    methods: {
        async deleteRestaurant(id) {
            console.warn(id);
            let result = await axios.delete("http://localhost:3000/retaurant/" + id);
            console.warn(result);
            if (result.status == 200) {
                this.loadData()
            }
        },
        async loadData() {
            let user = localStorage.getItem('user-info');
            this.name = JSON.parse(user).name;
            if (!user) {
                this.$router.push({
                    name: 'SignUp'
                })
            }
            let result = await axios.get("http://localhost:3000/retaurant");
            console.warn(result);
            this.restaurants = result.data
        }
    },
    mounted() {
        this.loadData()
    }
}
</script>

<style>
#customers {
    font-family: Arial, Helvetica, sans-serif;
    border-collapse: collapse;
    width: 80%;
    margin-left: auto;
    margin-right: auto;
}

#customers td,
#customers th {
    border: 1px solid #ddd;
    padding: 8px;
}

#customers tr:nth-child(even) {
    background-color: #f2f2f2;
}

#customers tr:hover {
    background-color: #ddd;
}

#customers th {
    padding-top: 12px;
    padding-bottom: 12px;
    text-align: left;
    background-color: #04AA6D;
    color: white;
}
</style>
