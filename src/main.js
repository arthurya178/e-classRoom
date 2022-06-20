import { createApp } from 'vue'
import vueCookie from 'vue-cookies'
import App from './App.vue'
import router from '@/router'
import store from "@/vuex/index";
import 'bulma/css/bulma.css'
import '../public/fontawesome-free-6.1.1-web/css/all.css'

createApp(App).use(router).use(store).use(vueCookie).mount('#app')
