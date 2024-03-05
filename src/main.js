import { createApp } from 'vue'
import { createPinia } from 'pinia'

import Loading from 'vue-loading-overlay';   
import 'vue-loading-overlay/dist/css/index.css';

import 'bootstrap';

import axios from 'axios'
import VueAxios from 'vue-axios'

import App from './App.vue'
import router from './router'

const app = createApp(App)

app.use(createPinia())
app.use(router)
app.use(VueAxios, axios);  //API串接套件

app.component('LoadingPlugin', Loading) //Loading 套件

app.mount('#app')
