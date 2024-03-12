import { createApp } from 'vue'
import { createPinia } from 'pinia'

import Loading from 'vue-loading-overlay';
import 'vue-loading-overlay/dist/css/index.css';

import 'bootstrap';

import axios from 'axios'
import VueAxios from 'vue-axios'

import $httpMessageState from '@/methods/pushMessageState'

import { date, currency } from '@/methods/filters'

import App from './App.vue'
import router from './router'

const app = createApp(App)

// 
app.config.globalProperties.$filters={
    date,
    currency,
};

// 正常來說不建議太多方法掛 Global，這裡可以使用 provide 來處理
// app.config.globalProperties.$httpMessageState = $httpMessageState;
app.provide('$httpMessageState', $httpMessageState);

app.use(createPinia())
app.use(router)
app.use(VueAxios, axios);  //API串接套件

app.component('LoadingPlugin', Loading) //Loading 套件

app.mount('#app')
