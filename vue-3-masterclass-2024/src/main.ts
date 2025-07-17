import './assets/main.css'
import 'iconify-icon'

import { createApp } from 'vue'
import { createPinia } from 'pinia'

import App from './App.vue'
import router from './router'

const app = createApp(App)

app.use(createPinia())
app.use(router)

// NOTE: manage errors in this level of the app
// app.config.errorHandler = (error)=>{
//   // ..
// }

// NOTE: pinia store can be used in the ts files cause the code is executed after
// the stores are loaded in the app

app.mount('#app')
