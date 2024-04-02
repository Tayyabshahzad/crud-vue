<template lang="">
    <div>
        <Header />
        <h1>Dashbaord</h1>
        <button class="btn btn-sm"  v-on:click="showCategoryForm()">  Add New Category</button>
        <div class="add-form" v-if="categoryForm">
            <h2>Add New Category</h2>
            <div class="add">
                <input type="text" v-model="category.name" name="name" placeholder="Name"> 
                <button v-on:click="addCategory">Add Category</button>
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
                category: {
                    name: '', 
                },
                categoryForm: false
            }
        },
        methods: {
           async addCategory() {  
                const result = await axios.post("http://localhost:3000/api/categories", {
                    name: this.category.name, 
                })
                console.warn(result);
                if (result.status == 201) {
                    this.$router.push({ name: 'Dashbaord' })
                }
            },


            async getCategories() {
                try { 
                    const token = localStorage.getItem('token');
                    console.log(token);
                    if (!token) { 
                        throw new Error('Token not available');
                    } 
                    const response = await axios.get("http://localhost:8000/api/categories", {
                    headers: {
                        Authorization: `Bearer ${token}`
                    }
                    });
                    console.log(response);
                    this.categories = response.data; // Update categories array with fetched data
                } catch (error) {
                    console.error('Error fetching categories:', error); 
                }
            },
 
 
            showCategoryForm() { 
                this.categoryForm = true
            }
        },
        mounted() { 
            let token = localStorage.getItem('token');
            if (!token) {
                this.$router.push({ name: 'Login' })
            }else{
                this.getCategories(); 
            }
             
        }
    }
    </script>
    
    <style lang="">
    
    </style>
    