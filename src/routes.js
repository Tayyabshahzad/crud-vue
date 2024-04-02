import Home from './components/Login.vue'
import SignUp from './components/SignUp.vue'
import Login from './components/Login.vue'
import Category from './components/Category.vue'
import Car from './components/Car.vue'
import {createRouter, createWebHistory} from 'vue-router'

const routes = [
    {
        name: 'Home',
        component: Home,
        path:'/'
    },
    {
        name: 'SignUp',
        component: SignUp,
        path:'/sign-up',
    },
    {
        name: 'Login',
        component: Login,
        path:'/login'
    },

    {
        name: 'Category',
        component: Category,
        path:'/category'
    },

    {
        name: 'Cars',
        component: Car,
        path:'/cars'
    },


]

const router = createRouter({
    history: createWebHistory(),
    routes
});
export default router
