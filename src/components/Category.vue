<template lang="">
  <div>
    <Header />
    <h1>Categories</h1>
    <button class="btn btn-sm" v-on:click="showCategoryForm('', 'add')">
      Add New Category
    </button>

    <p v-if="errorMessage" class="error-message" style="color:red">{{ errorMessage }}</p>
    <div class="add-form" v-if="categoryForm">
      <h2>Add New Category</h2>
      <div class="add">
        <input
          type="text"
          v-model="category.name"
          name="name"
          id="name"
          placeholder="Name"
        />
        <input type="hidden" v-model="category.id" />
        <small class="invalid-feedback" v-for="(error, index) in v$.category.name.$errors" :key="index">{{ error.$message }}</small>

        <button v-on:click="addCategory()">Add Category</button>
      </div>
    </div>

    <table class="table">
      <tr>
        <td>ID</td>
        <td>Name</td>
        <td>Action</td>
      </tr>
     
      <tbody>
        <tr v-for="(category, index) in categories" :key="index">
          <td>
            {{ category.id }}
          </td>
          <td>
            {{ category.name }}
          </td>
          <td>
            <button type="button" @click="showCategoryForm(category, 'edit')">
              Edit
            </button>
            |
            <button type="button" @click="deleteCategory(category.id)">
              Delete
            </button>
          </td>
        </tr>
      </tbody>
    </table>
  </div>


  
</template>

<script>
import axios from 'axios';
import Header from './Header.vue';
import { useVuelidate } from "@vuelidate/core";
import { required, helpers } from "@vuelidate/validators";

export default {
    name: "AddPage",
    components: {
        Header,
    },
    setup() {
      const v$ = useVuelidate();
      return { v$ };
    },
    data() {
        return {
            category: {
                name: '',
                id: '',
                type: '',
            },
            categoryForm: false,
            categories: [],
            errorMessage : '',
            validationError: false,
        }
    },
    methods: {

        async addCategory() {
            const isValid = await this.v$.$validate();
            if (!isValid) { 
                this.validationError = true;
            }else{ 
                
                this.validationError = false;
                if(this.category.id){
                    this.category.name
                    try {
                        const token = localStorage.getItem('token');
                        if (!token) {
                            throw new Error('Token not available');
                        }
                        const response = await axios.put(`http://localhost:8000/api/categories/${this.category.id}`, {
                            name: this.category.name,
                        }, {
                            headers: {
                                Authorization: `Bearer ${token}`
                            }
                        });
                        if(response){
                            this.getCategories();
                            this.categoryForm = false
                        }
                    } catch (error) {
                        
                        if (error.response && error.response.data && error.response.data.message) {
                            // Set the error message to be displayed in the form
                            this.errorMessage = error.response.data.message;
                        } else {
                            console.error('Error fetching categories:', error);
                            console.error('Error fetching categories:', error.response.data.message);
                        }
                    
                    }
                }else{
                    try {
                    const token = localStorage.getItem('token'); 
                    if (!token) {
                        throw new Error('Token not available');
                    }
                    const response = await axios.post("http://localhost:8000/api/categories", {
                        name: this.category.name,
                    }, {
                        headers: {
                            Authorization: `Bearer ${token}`
                        }
                    });
                    if(response){
                        console.log(response);
                        this.getCategories();
                        this.categoryForm = false
                    }

                } catch (errors) {
                
                    console.log(errors);
                        if (errors.response && errors.response.data && errors.response.data.message) { 
                            this.errorMessage = errors.response.data.message;
                        } else {
                            console.error('Error fetching categories:', errors); 
                        }
                }
                }
            }

        },


        async getCategories() {
            try {
                const token = localStorage.getItem('token');
                if (!token) {
                    throw new Error('Token not available');
                }
                const response = await axios.get("http://localhost:8000/api/categories", {
                headers: {
                    Authorization: `Bearer ${token}`
                }
                });
                this.categories = response.data.categories
            } catch (error) {
                console.error('Error fetching categories:', error);
            }
        },

        async deleteCategory(id) {
                try {
                    const token = localStorage.getItem('token');
                    if (!token) {
                        throw new Error('Token not available');
                    }

                    const response = await axios.delete(`http://localhost:8000/api/categories/${id}`, {
                        headers: {
                            Authorization: `Bearer ${token}`
                        }
                    });
                    if(response){
                        this.getCategories();
                        this.categoryForm = false
                    }
                } catch (error) {
                    console.error('Error fetching categories:', error);
                }
        },

        showCategoryForm(source,type) {
            if(type == 'edit'){
                this.category.name =  source.name
                this.category.id = source.id
            }else{
                this.category.name =  ''
                this.category.id = ''
            }

            this.categoryForm = true

        },
    },
    mounted() {
        let token = localStorage.getItem('token');
        if (!token) {
            this.$router.push({ name: 'Login' })
        }else{
            this.getCategories();
        }

    },
    validations() {
      return {
        category: {
            name: {  required: helpers.withMessage('Please select a category name.', required),
          },
        },
      };
    },
}
</script>

<style>
.table {
  width: 100%;
  border-collapse: collapse;
  border-spacing: 0;
}

/* Styles for table header */
.table th {
  background-color: #f2f2f2;
  text-align: left;
  padding: 8px;
  border: 1px solid #ddd;
}

/* Styles for table rows */
.table td {
  padding: 8px;
  border: 1px solid #ddd;
}

/* Alternate row color */
.table tr:nth-child(even) {
  background-color: #f2f2f2;
}

/* Hover effect */
.tabletr:hover {
  background-color: #ddd;
}
</style>
