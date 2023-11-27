import { createApp } from 'vue'
import App from './App.vue'
import router from './router'

import querystring from 'querystring';
window.querystring = querystring;

import 'bootstrap/dist/css/bootstrap.css'
import 'bootstrap-vue/dist/bootstrap-vue.css'

const app = createApp(App)

app.use(router)

app.mount('#app')

import "bootstrap/dist/js/bootstrap.js"