import { createApp } from 'vue'
import { createPinia } from 'pinia'

// 過場動畫套件
import Loading from 'vue-loading-overlay';
import 'vue-loading-overlay/dist/css/index.css';

import 'bootstrap';

import axios from 'axios'
import VueAxios from 'vue-axios'

import $httpMessageState from '@/methods/pushMessageState'

import { date, currency } from '@/methods/filters'

// 驗證表單套件
import { defineRule, Form, Field, ErrorMessage, configure } from 'vee-validate';
import * as AllRules from '@vee-validate/rules';
import { localize, setLocale } from '@vee-validate/i18n';
import zhTw from '@/locale/zh_TW.json'

// 彈跳視窗套件
import VueSweetalert2 from 'vue-sweetalert2';
import 'sweetalert2/dist/sweetalert2.min.css';

// ICON套件
import { library } from '@fortawesome/fontawesome-svg-core'
import { FontAwesomeIcon } from '@fortawesome/vue-fontawesome'
import { faUserSecret } from '@fortawesome/free-solid-svg-icons'

/* 將圖示新增到圖庫中 */
library.add(faUserSecret)

import App from './App.vue'
import router from './router'


const pinia = createPinia();
const app = createApp(App)

Object.keys(AllRules).forEach(rule => {
    defineRule(rule, AllRules[rule]);
});

configure({
    generateMessage: localize({ zh_TW: zhTw }), //載入繁體中文
    validateOnBlur: true,//當輸入任何內容直接驗證
});
// 預設中文語系
setLocale('zh-TW');

// 
app.config.globalProperties.$filters = {
    date,
    currency,
};

// 正常來說不建議太多方法掛 Global，這裡可以使用 provide 來處理
app.config.globalProperties.$httpMessageState = $httpMessageState;
// app.provide('httpMessageState', httpMessageState);



app.use(router)
app.use(pinia)
app.use(VueAxios, axios);  //API串接套件
app.use(VueSweetalert2); //彈跳視窗


app.component('LoadingPlugin', Loading) //Loading 套件

app.component('font-awesome-icon', FontAwesomeIcon) //icon套件

// 表單驗證
app.component('FormVee', Form);
app.component('FieldVee', Field);
app.component('ErrorMessage', ErrorMessage);


app.mount('#app')
