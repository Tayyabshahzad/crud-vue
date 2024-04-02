<template lang="">
<div>
    <Header />
    <h1>Hello, Welcome To Add Page</h1>
    <div class="add-form">
        <h2>Add Restaurent</h2>
        <div class="add">
            <input type="text" v-model="restaurant.name" name="name" placeholder="Name">
            <input type="email" v-model="restaurant.address" name="address" placeholder="Address">
            <input type="text" v-model="restaurant.contact" name="contact" placeholder="Contact">
            <button v-on:click="addRestaurant">Add Restaurent</button>
        </div>
    </div>
</div>
</template>

<script>
import axios from 'axios';
import Header from './Header.vue';
export default {
    name: "AddPage",
    components: {
        Header
    },
    data() {
        return {
            restaurant: {
                name: '',
                address: '',
                contact:''
            }
        }
    },
    methods: {
       async addRestaurant() {
            
            console.warn(this.restaurant);
            const result = await axios.post("http://localhost:3000/retaurant", {
                name: this.restaurant.name,
                address: this.restaurant.address,
                contact: this.restaurant.contact
            })
            console.warn(result);
            if (result.status == 201) {
                this.$router.push({ name: 'Home' })
            }
        }
    },
    mounted() {
        let user = localStorage.getItem('user-info');
        if (!user) {
            this.$router.push({ name: 'SignUp' })
        }
    }
}
</script>

<style lang="">

</style>
