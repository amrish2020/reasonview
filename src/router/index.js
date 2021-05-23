import Vue from 'vue'
import VueRouter from 'vue-router'
import axios from 'axios'
import VueAxios from 'vue-axios'
Vue.use(VueAxios, axios)
import AxiosPlugin from 'vue-axios-cors';

//import { Form, HasError, AlertError } from 'vform'

Vue.use(VueRouter)
Vue.use(AxiosPlugin)

  const routes = [
  {
    path: '/',
    name: 'signup',
    component: () => import('../components/Signup.vue')
  },
  {
    path: '/login',
    name: 'login',
    component: () => import('../components/Login.vue')
  },
  {
    path: '/forgot-password',
    name: 'forgot-password',
    component: () => import('../components/ForgotPassword.vue')
  }
  ,
  {
    path: '/home',
    name: 'home',
    component: () => import('../components/Home.vue')
  }
]

window.axios = require('axios');
//Vue.component(HasError.name, HasError)
//Vue.component(AlertError.name, AlertError)
//window.Form = Form;
Vue.use(VueAxios, axios)

//cors = require("cors");
//app.use(cors());


const router = new VueRouter({
  mode: 'history',
  base: process.env.BASE_URL,
  routes
})

export default router
