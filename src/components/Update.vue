<template lang="">
<div>
    <Header />
    <h1>Hello, Welcome To Update Page</h1>
    <div class="add-form">
        <h2>Update Restaurent</h2>
        <div class="add">
            <input type="text" v-model="restaurant.name" name="name" placeholder="Name">
            <input type="email" v-model="restaurant.address" name="address" placeholder="Address">
            <input type="text" v-model="restaurant.contact" name="contact" placeholder="Contact">
            <button v-on:click="updateRestaurant">Update Restaurent</button>
        </div>
    </div>
</div>
</template>

<script>
import axios from 'axios';
import Header from './Header.vue';
export default {
    name: "UpdatePage",
    components: {
        Header
    },
    data() {
        return {
            restaurant: {
                name: '',
                address: '',
                contact: ''
            }
        }
    },
    methods: {
        async updateRestaurant() {

            console.warn(this.restaurant);
            const result = await axios.put("http://localhost:3000/retaurant/"+this.$route.params.id, {
                name: this.restaurant.name,
                address: this.restaurant.address,
                contact: this.restaurant.contact
            })
            console.warn(result);
            if (result.status == 200) {
                this.$router.push({ name: 'Home' })
            }
        }
    },
   async mounted() {
        let user = localStorage.getItem('user-info');
        if (!user) {
            this.$router.push({ name: 'SignUp' })
       }
       const result = await axios.get("http://localhost:3000/retaurant/"+this.$route.params.id);
       console.warn(result);
       console.warn(this.$route.params.id)
       console.warn(result.data)
       this.restaurant = result.data
    }
}
</script>

<style lang="">

</style>
