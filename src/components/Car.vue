<template>
    <div> 
      <Header />
      <h1>Cars</h1>
      <button class="btn btn-sm" @click="showCarForm('', 'add')">Add New Car</button>
      <hr/>
      <div class="add-form" v-if="carForm">
        <h2>Add New Car</h2>
        <div class="add">
          <select id="category_id" name="category_id" class="select" v-model="car.category_id">
            <option value="" selected disabled>Select Category</option>
            <option v-for="category in categories" :key="category.id" :value="category.id">{{ category.name }}</option>
          </select>
        
          <small class="invalid-feedback" v-for="(error, index) in v$.car.category_id.$errors" :key="index">{{ error.$message }}</small>

  
          <input type="text" v-model="car.color" id="color" name="color" placeholder="Color"> 
          <small class="invalid-feedback" v-for="(error, index) in v$.car.color.$errors" :key="index">{{ error.$message }}</small>

          <input type="text" v-model="car.model"  id="model" name="model" placeholder="Model"> 
          <small class="invalid-feedback" v-for="(error, index) in v$.car.model.$errors" :key="index">{{ error.$message }}</small>

          <input type="text" v-model="car.make"  id="make" name="make" placeholder="Make"> 
          <small class="invalid-feedback" v-for="(error, index) in v$.car.make.$errors" :key="index">{{ error.$message }}</small>

          <input type="text" v-model="car.registration_no"  id="registration_no" name="registration_no" placeholder="Registration No"> 
          <small class="invalid-feedback" v-for="(error, index) in v$.car.registration_no.$errors" :key="index">{{ error.$message }}</small>

          <input type="hidden" v-model="car.id">
          <button @click="addCar('add', '')">Add Car</button>
        </div>
      </div>
      <table class="display table">
        <tr>
          <td>ID</td>
          <td>Category</td>
          <td>Color</td>
          <td>Model</td>
          <td>Make</td>
          <td>Registration No</td>
          <td>Action</td>
        </tr>
        <tbody>
          <tr v-for="(car) in cars" v-bind:key="car.id">
          
            <td>{{ car.id }}</td>
            <td>{{ car.category.name }}</td>
            <td>{{ car.color }}</td>
            <td>{{ car.model }}</td>
            <td>{{ car.make }}</td>
            <td>{{ car.registration_no }}</td>
            <td>
              <button @click="showCarForm(car, 'edit')">Edit</button> | 
              <button @click="deleteCategory(car.id)">Delete</button>
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
        car: {
          id: '',
          category_id: '', 
          color: '',
          model: '',
          make: '',
          registration_no: '',
        },
        carForm: false,
        cars: {},
        categories: {},
        validationError: false,
      };
    },
    validations() {
      return {
        car: {
          category_id: {
            required: helpers.withMessage('Please select a category.', required),
          },
          color: {
            required: helpers.withMessage('Please enter a color.', required),
          },
          model: {
            required: helpers.withMessage('Please enter a model.', required),
          },
          make: {
            required: helpers.withMessage('Please enter a make.', required),
          },
          registration_no: {
            required: helpers.withMessage('Please enter a registration number.', required),
          },
        },
      };
    },
    methods: {
      async addCar(type, source) {
        console.log(type, source); 
        const isValid = await this.v$.$validate();
        if (!isValid) {
             this.validationError = true;

        } else {
            this.validationError = false;
       
        try {
          const token = localStorage.getItem('token');
          if (!token) {
            throw new Error('Token not available');
          }
          let response;
          if (this.car.id) {
            response = await axios.put(`http://localhost:8000/api/cars/${this.car.id}`, { ...this.car }, {
              headers: {
                Authorization: `Bearer ${token}`
              }
            });
          } else {
            response = await axios.post("http://localhost:8000/api/cars", { ...this.car }, {
              headers: {
                Authorization: `Bearer ${token}`
              }
            });
          }
          if (response) {
            this.getCars();
            this.carForm = false;
          }   
        } catch (error) {
          console.error('Error:', error); 
        }
        }

      },
      async getCars() {
        try {
          const token = localStorage.getItem('token');
          if (!token) {
            throw new Error('Token not available');
          }
          const response = await axios.get("http://localhost:8000/api/cars", {
            headers: {
              Authorization: `Bearer ${token}`
            }
          }); 
          this.cars = response.data.cars; 
          this.categories = response.data.categories; 
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
          const response = await axios.delete(`http://localhost:8000/api/cars/${id}`, {
            headers: {
              Authorization: `Bearer ${token}`
            }
          });
          if(response){
            this.getCars(); 
            this.categoryForm = false;
          }    
        } catch (error) {
          console.error('Error:', error); 
        } 
      },
      showCarForm(source, type) {  
        if (type == 'edit') {
          this.car = { ...source };
        } else {
          this.car = {
            id: '',
            category_id: '', 
            color: '',
            model: '',
            make: '',
            registration_no: '',
          };
        } 
        this.carForm = true;
      }, 
    },
    mounted() { 
      let token = localStorage.getItem('token');
      if (!token) {
        this.$router.push({ name: 'Login' });
      } else {
        this.getCars(); 
      } 
    }
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
  .table tr:hover {
    background-color: #ddd;
  }
  .select {
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
  </style>
  